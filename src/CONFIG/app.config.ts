export const EnvConfiguration=()=>({

    environment:process.env.NODE_ENV || "dev",
    mongodb : process.env.MONGODB,
    PORT:process.env.PORT||3002
})