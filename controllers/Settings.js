import prisma from "../DB/db.config.js";
export const updateSettings  = async(req,res)=>{
  const {userId}= req
  const {notifications}= req.body
console.log(req.params);

  try {
    const createUserSettings = await prisma.userSettings.create({
        data:{
            userId
        },
        
    });
    return res.status(200).json(createUserSettings );
  } catch (error) {
    console.log(error,"error accure");
    
  }
}

export const settings= async(req,res)=>
{
    const{privacyPolicy,termsConditions,aboutApp} = req.body
    try {
           const update =await prisma.settings.create({
        data:{
            privacyPolicy,
            aboutApp,
            termsConditions
        }
    });
    return res.status(200).json(update)
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg:"something wrong "})
    }
 
}