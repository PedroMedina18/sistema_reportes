
class Text{
    constructor({text, isNull=false, maxLenght=null, minLenght=null, pattern=null}){
        this.text=text;
        this.isNull=isNull;
        this.maxLenght=maxLenght;
        this.minLenght=minLenght;
        this.pattern=pattern;
    }

    validar(){
        try{
            if(!this.isNull && this.text === null){
                return {
                    message:"Nulo",
                    code:400,
                    status:false
                }
            }
            if(!this.isNull && this.text === undefined){
                return {
                    message:"Indefinido",
                    code:400,
                    status:false
                }
            }

            if(typeof(this.text)!=="string"){
                return {
                    message:"Tipo de dato invalido debe ser string",
                    code:422,
                    status:false
                }
            }

            const textSting = String(this.text).trim()

            if(!this.isNull && textSting.length === 0){
                return {
                    message:"Sin valor",
                    code:400,
                    status:false
                }
            }

            if(this.maxLenght && textSting > this.maxLenght){
                return {
                    message:`Maximo ${maxLenght} caracteres`,
                    code:422,
                    status:false
                }
            }

            if(this.minLenght && textSting < this.minLenght){
                return {
                    message:`Minimo ${minLenght} caracteres`,
                    code:422,
                    status:false
                }
            }

            if(this.pattern && !this.pattern.test(textSting)){
                return {
                    message:`Invalido`,
                    code:422,
                    status:false
                }
            }

            return{
                message:`OK`,
                code:200,
                status:true,
                result:textSting
            }

        }catch(error){
            console.log(error)
            return {
                message:`Error Desconocido`,
                code:500,
                detail:error.message,
                status:false
            }
        }
    }
}

export default Text
