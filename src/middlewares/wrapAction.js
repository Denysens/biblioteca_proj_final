export const wrapAction = action => async (req, res, next) =>{
    try{
        await action (req, res)
    }catch(error){
        next(error)
    }
}