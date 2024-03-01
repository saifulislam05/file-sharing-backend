const uploadFile = async (req, res) => {

    console.log(req.body);
    res.status(200).json({
        success: true,
        message:"dummy upload"
    })
}
const generateLink=async (req,res)=>{res.status(200).json({
  success: true,
  message: "dummy generate",
});}
const downloadFile=async (req,res)=>{res.status(200).json({
  success: true,
  message: "dummy download",
});}
const sendFileLinkOnEmail=async (req,res)=>{res.status(200).json({
  success: true,
  message: "success sendfilelinkon email",
});}

export {uploadFile,generateLink,downloadFile,sendFileLinkOnEmail} ;