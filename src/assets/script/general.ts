function SoloNumero (e:any){
    if( !( e.keyCode >= 96 && e.keyCode <= 105 ) && (e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 8) {
       return  e.preventDefault();
    }
}

function SoloNumeroPrecio (e:any){
    if( !( e.keyCode >= 96 && e.keyCode <= 105 ) && (e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 8  && e.keyCode != 190  && e.keyCode !=110  && e.keyCode !=188) {
       return  e.preventDefault();
    }
}

function SoloLetra(e:any){
    if((e.keyCode < 65 || e.keyCode > 90) && e.keyCode != 8) {
       return  e.preventDefault();
    }
}

export default function Vacio(datas:any){
    let res:boolean = false;
    for (const [key, value] of Object.entries(datas)) {
        if((value == '' || value == null) && value != 0 ){
            console.log(key);
            res = true;
            break;
        }else{
            if(value){
                res = false;
            }else{
                res = true;
            }
        }
    }
    return res;
}

function CrearFecha(){
    let fecha = new Date();
    let fecha_hoy:any = null;
    fecha_hoy += fecha.getFullYear();
    if((fecha.getMonth()+1 )<10){
        fecha_hoy +="-"+'0'+(fecha.getMonth()+1 )
    }else{
        fecha_hoy +="-"+(fecha.getMonth()+1 )
    }

    if(fecha.getDate()<10){
        fecha_hoy +="-"+'0'+fecha.getDate()
    }else{
        fecha_hoy +="-"+fecha.getDate()
    }
    return fecha_hoy
}

