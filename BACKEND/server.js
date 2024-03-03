const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const tf = require("@tensorflow/tfjs-node");
const sharp = require("sharp");
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: true }));
// const fs = require('fs').promises;
const jsfeat = require('jsfeat');
const moment = require('moment');
const archiver = require('archiver');
const fs = require('fs');
app.use(bodyParser.json());
/////////////////////////////////////////////////////////////
var sid = "AC1bb8a55e79afc7ee224ae241090bf27c";
var auth_token = "e4d947fae762b18361504e814523bc56";

var twilio = require("twilio")(sid, auth_token);
////////////////////////////////////////////////////////////////////
const mongoose = require("mongoose")
const windowsHostIP = '192.168.42.158';
const mongoDBURI = 'mongodb+srv://sathwikpusapati6868:kbx9kGfxwXzvoBEr@reports.wevbdzp.mongodb.net/?retryWrites=true&w=majority';

// const mongoose = require("mongoose");
async function connectToDatabase() {
  try {
    await mongoose.connect(mongoDBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}


const reports = mongoose.Schema({
  registration_number: String,
  Phone_number: String,
  imageName: String,
  label: String,
})
const Reports = mongoose.model("reports", reports);
const uploads = mongoose.Schema({
  
registration_number:String,
Phone_number:String,
Check_point:String,
time:String,
date:String,
imageName:String,
label:String
})
const Uploads = mongoose.model("uploads", uploads);
////////////////////////////////////////////////////////////////////
const dealerSchema = new mongoose.Schema({
  registrationNo:String,
  phoneNumber:String,
  checkpoint:String,
  time: String,
  date:String,
  label:String,

});
const Dealer = mongoose.model('Dealer', dealerSchema);
////////////////////////////////////////////////////////////////////
let model;
const modelPath = "model.js/model.json";

async function loadModel() {
  try {
    model = await tf.loadLayersModel(`file://${modelPath}`);
    console.log("Model loaded");
  } catch (error) {
    console.error("Error loading the model:", error);
  }
}
//////////////////////////////////////////////////////////////////////////

// const newModelPath = "model_json/model.json";
// let newModel
// async function loadnewModel() {
//   try {
//     newModel = await tf.loadLayersModel(`file://${newModelPath}`);
//     console.log("newModel loaded");
//     // return newModel;
//   } catch (error) {
//     console.error("Error loading the model:", error);
//   }
// }
/////////////////////////////////////////////////////////////////////
// loadModel();
// loadnewModel();
// connectToDatabase();
/////////////////////////////////////////////////////////////////////
app.use(cors());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.get("/", function (req, res) {
  console.log("got a GET request for the home page");
  res.send("Welcome to Home page");
});
// app.post('/uploads',function(req,res){
//     console.log()
//     res.send("recived an image")
// })
////////////////////////////////////////////
// working code
app.post("/uploads", upload.single("image"), async (req, res) => {
  // console.log(req)
  console.log("post req recived");
  console.log(req.file);
  //   res.send("Received an image");
  try {
    console.log(req.file.path);
    console.log(req.body)
    const processedImage = await sharp(req.file.path)
      .resize({ width: 128, height: 128 })
      .toBuffer();
    console.log('Image processed successfully.');
    //   res.json({ message: 'Image processed successfully.' });
    const inputTensor = tf.node.decodeImage(processedImage);
    const expandedTensor = inputTensor.expandDims();
    const normalizedTensor = expandedTensor.div(255.0);
    const reshapedTensor = normalizedTensor.reshape([1, 128, 128, 3]);
    const predictions = model.predict(reshapedTensor);
    const label = predictions.dataSync()[0] > 0.5 ? 'normal' : 'cracked';
    console.log({ label, confidence: predictions.dataSync()[0] * 100 });
    // res.send({ label, confidence: predictions.dataSync()[0] * 100 });
    const imageName = req.file.filename;
    const phoneNumber = req.body.Pn;
    const regNumber = req.body.Rn;
    // console.log(name)
    console.log(phoneNumber)
    console.log(regNumber)
    console.log(imageName)
    const saveToDb = new Reports({
      registration_number: regNumber,
      Phone_number: phoneNumber,
      imageName: imageName,
      label: label,
    });
    saveToDb.save().then(() => {
      console.log("save to db")
    }).catch((e) => {
      console.log("error cannot save to db")
    })
    // res.send("success")
    res.json({ message: 'Image processed successfully.' });

    // if (label === 'cracked') {
    //   sendTwilioMessage();
    // }
  } catch (error) {
    console.error("Error processing image:", error);
    // res.json({ message: 'Error processing Image.' });
    res.status(500).json({ error: "Error processing image" });
  }

});
///////////////////////////////////////////
// const { generateHighlightedImage } = require('./highlighted'); // Adjust the path
const newModelPath = "model_json/model.json";
let newModel
async function loadnewModel() {
  try {
    newModel = await tf.loadLayersModel(`file://${newModelPath}`);
    console.log("newModel loaded");
    // return newModel;
  } catch (error) {
    console.error("Error loading the model:", error);
  }
}
app.post("/label", upload.single("image"), async (req, res) => {
  
  console.log("post req received");

  try {
    console.log(req.file.path);
    console.log(req.body);

    // Process the uploaded image
    const processedImage = await sharp(req.file.path)
      .resize({ width: 128, height: 128 })
      .toBuffer();
    console.log('Image processed successfully.');
    const createdAt = moment().format("DD/MM/YYYY, HH:mm:ss");
    const [date, time] = createdAt.split(', ')

    // Perform machine learning predictions
    const inputTensor = tf.node.decodeImage(processedImage);
    const resizedTensor = tf.image.resizeBilinear(inputTensor, [227, 227]);
    const expandedTensor = resizedTensor.expandDims();
    const normalizedTensor = expandedTensor.div(255.0);
    const predictions = newModel.predict(normalizedTensor);
    const score = predictions.dataSync()[0];
    const label = score > 0.5 ? 'normal' : 'cracked';
    console.log('Label:', label);
    console.log('Confidence:', score);

    let confidence = score;
    if (label === 'cracked') {
      console.log('Inside if condition');
      confidence = 100 - score;
      console.log('Updated confidence:', confidence);
    }

console.log('Final confidence:', confidence);
    // Save processed image with a new filename
    // const imageName = `${Date.now()}_${req.file.originalname}`;
    // const imageSavePath = `path/to/save/${imageName}`;
    // await sharp(processedImage).toFile(imageSavePath);

    // Extract additional details from the request
    const imageName = req.file.filename;
    console.log(imageName);
    const phoneNumber = req.body.Pn;
    const regNumber = req.body.Rn;
    const Mock = mongoose.model("mock", uploadSchema);

    // Find or create a document with the registration number
    Mock.findOneAndUpdate(
      { 
        regisNo: regNumber
      },
      {
        $addToSet: {
          reports: {
            imageName: imageName,
            label: label,
            damage : confidence,
            tollPlaza: 'ORR-1',
            createdAt: createdAt,
          },
        },
        $setOnInsert: { phoneNumber: phoneNumber } // Add phoneNumber only if a new document is inserted
      },
      { upsert: true, new: true }
    )
    .then(async (updatedDocument) => {
      console.log("Updated document:", updatedDocument);
      /////////////////////////////////////////////////////
      if (label === 'cracked') {
        // If the image is cracked, add details to the dealer collection
        await Dealer.deleteMany({ registrationNo: regNumber });
        await Dealer.create({
          registrationNo:regNumber,
          phoneNumber:phoneNumber,
          checkpoint:"ORR",
          time: time,
          date:date,
          label:label,
        });
        console.log("Added cracked tire details to dealer collection");
      }  else {
        // If the image is normal, delete any existing documents in the dealer collection with the same registration number
        const dealerDocuments = await Dealer.find({ registrationNo: regNumber });
        if (dealerDocuments.length > 0) {
          await Dealer.deleteMany({ registrationNo: regNumber });
          console.log(`Deleted ${dealerDocuments.length} documents from dealer collection for registration number ${regNumber}`);
        }
      }
      res.json({ message: 'Image processed successfully.' });
    })
      .catch((error) => {
        console.error("Error updating document:", error);
        res.status(500).json({ error: "Error updating document" });
      });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Error processing image" });
}
});
/////////////////////////////////
/////////////////////////////////
const sendTwilioMessage = async () => {
  const messageBody = "Cracked!!!!!!!!!!!!!!!!!!!";

  try {
    await twilio.messages.create({
      from: "+19104474305",
      to: "+919493400204",
      body: messageBody,
    });

    console.log("Message sent successfully!");
  } catch (error) {
    console.error("Error sending Twilio message:", error);

    // Implement a retry mechanism
    console.log("Retrying in 5 seconds...");
    setTimeout(() => sendTwilioMessage(), 5000);
  }
};
/////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////
app.get("/getdb", async (req, res) => {
  console.log("got a get req");

  try {
    const data = await Reports.find({ label: "cracked" });
    console.log("Data from the database:", data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/////////////////////////////////////////////////////////
const validUsers = [
  { username: 'sathvik', password: '1H' },
  { username: 'harshith', password: '16' },
];
app.post('/api/login', (req, res) => {
  console.log("Got a login req")
  const { username, password } = req.body;

  // Check if the provided username and password are valid
  const user = validUsers.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // In a real-world scenario, you would generate a JWT token here
    res.json({ username: user.username });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});
/////////////////////////////////////////////////////////

app.get("/search", async (req, res) => {
  console.log("got a get req");
  console.log(req)

  const { registrationNumber } = req.query;

  if (!registrationNumber) {
    return res.status(400).json({ error: 'Registration number is required' });
  }

  try {
    const data = await Reports.find({ registration_number: registrationNumber });
    console.log("Data from the database:", data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
/////////////////////////////////////////////////////////
// app.get("/searchuploads", async (req, res) => {
//   console.log("search uploads req received");
//   try {
//     const data = await Uploads.find({ label: "cracked" });
//     console.log("Data from the database:", data);
//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// })
app.get("/searchuploads", async (req, res) => {
  console.log("search uploads req received");
  try {
    const data = await Dealer.find({});
    console.log("Data from the database:", data);
    const responseData = {
      data: data,
      imagePaths: imagePaths
    };
    res.json(responseData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
///////////////////////

/////////////////////////////////////////////////////////
app.get("/tirereports/:regisNo", async (req, res) => {
  console.log("got request");
  try {
    const { regisNo } = req.params;

    const singleTireReport = await reports.find({ regisNo });
    res.status(200).json(singleTireReport);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Error fetching reports" });
  }
});
/////////////////////////////////////////////////////////
const path = require('path');

app.get("/newsearch", async (req, res) => {
  console.log("got a get req");
  console.log(req);
  const Reports = mongoose.model("reports", reports);
  const { registrationNumber } = req.query;

  if (!registrationNumber) {
    return res.status(400).json({ error: 'Registration number is required' });
  }

  try {
    const data = await Reports.find({ registration_number: registrationNumber });

    // Extract image names from the data
    const imageNames = data.map(entry => entry.imageName);

    // Generate local image file paths based on your local storage location (assuming 'uploads' folder)
    const imagePaths = imageNames.map(imageName => path.join(__dirname, 'uploads', imageName));

    // Combine data and local image file paths into the response
    const responseData = {
      data: data,
      imagePaths: imagePaths
    };

    console.log("Data from the database:", responseData);
    res.json(responseData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
/////////////////////////////////////////////////////////////
const uploadSchema = new mongoose.Schema({
  regisNo: String,
  phoneNo: Number,
  reports: [
    {
      imageName: String,
      label: String,
      damage: String,
      tollPlaza: String,
      createdAt: String,
    },
  ],
},{ collection: 'mock' });
app.get("/Dtable", async (req, res) => {
  console.log("got a get req");
  console.log(req);
  const Mock = mongoose.model("mock", uploadSchema);


  const { registrationNumber } = req.query;

  if (!registrationNumber) {
    return res.status(400).json({ error: 'Registration number is required' });
  }

  try {
    const data = await Mock.find({ regisNo: registrationNumber });


    // Extract image names from the data
    // const imageNames = data.map(entry => entry.imageName);

    // Generate local image file paths based on your local storage location (assuming 'uploads' folder)
    // const imagePaths = imageNames.map(imageName => path.join(__dirname, 'uploads', imageName));

    // Combine data and local image file paths into the response
    const responseData = {
      data: data,
      // imagePaths: imagePaths
    };

    console.log("Data from the database:", responseData);
    res.json(responseData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
/////////////////////////////////////////////////////////////
app.get('/getimage/:imageName', (req, res) => {
  const { imageName } = req.params;

  if (!imageName) {
    return res.status(400).json({ error: 'Image name is required' });
  }

  const imagePath = path.join(__dirname, 'uploads', imageName);

  // Send the image file
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error('Error sending image:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log(imageName, "sent")
  });
});
/////////////////////////////////////////////////////////////
app.get('/fortnightCheck', async (req, res) => {
  try {
    // Assuming you have a mongoose model named Tire
    const cracked_tires = await Reports.find({ label: "cracked" });
    const normal_tires = await Reports.find({ label: "normal" });

    // Calculate cracked and normal tires
    // const crackedTires = tires.filter(tire => tire.label === 'cracked');
    // const normalTires = tires.filter(tire => tire.label === 'normal');

    res.json({
      crackedTires: cracked_tires.length,
      normalTires: normal_tires.length,
    });
  } catch (error) {
    console.error('Error during fortnight check:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
/////////////////////////////////////////////////////////////
const feedbackSchema = new mongoose.Schema({
  email: String,
  feedback: String,
}, { collection: 'site_Feedbacks' });
const Feedback = mongoose.model("Feedback", feedbackSchema);
app.post("/feedback", async (req, res) => {
  const { email, feedback } = req.body;
  console.log("received feedback req")

  try {
    const newFeedback = new Feedback({ email, feedback });
    await newFeedback.save();

    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
/////////////////////////////////////////////////////////////

app.get('/download-images', (req, res) => {
  const createdAt = moment().format("DD-MM-YYYY_HH-mm-ss"); // Format the current date and time using dashes and underscores
  const [date, time] = createdAt.split(', ');
    const imageFiles = fs.readdirSync('uploads'); // Directory name is 'uploads'

    const output = fs.createWriteStream(`${createdAt}.zip`); // Use formatted date as part of the zip file name
    const archive = archiver('zip', {
        zlib: { level: 9 }
    });

    archive.pipe(output);

    imageFiles.forEach((file) => {
        archive.append(fs.createReadStream(`uploads/${file}`), { name: file }); // Path to image directory is 'uploads'
    });

    archive.finalize();
    output.on('close', () => {
        res.download(`${createdAt}.zip`, `${createdAt}.zip`, (err) => {
            if (err) {
                console.error('Error downloading zip file:', err);
            }
            fs.unlinkSync(`${createdAt}.zip`);
        });
    });
});

/////////////////////////////////////////////////////////////
async function startServer() {
  await loadModel();
  await loadnewModel();
  await connectToDatabase();
  // await highlightCracks(im, newModel);
  const server = app.listen(8000, () => {
    console.log("Server is listening on port 8000");
  });
}

startServer();
