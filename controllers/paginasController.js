import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio = async (req,res)=>{
    //consultar tres viajes del modelo viaje
    //lo que hago ahora es meter ambas promesas en un arreglo para que sean ejecutadas al mismo tiempo, y evitar así que si una consulta finalizaba y la otra tardaba no se dejara al usuario sin información. Aca se ejecutan ambas al mismo tiempo, y el bloque de codigo de render se ejecutará recien cuando termine resultado.
    const promiseDB = [];
    promiseDB.push(Viaje.findAll({limit: 3}))
    promiseDB.push(Testimonial.findAll({limit: 3}))

    try{
        const resultado = await Promise.all(promiseDB);
        res.render('inicio', {
        pagina: 'Inicio',
        clase: 'home',
        viajes: resultado[0],
        testimoniales: resultado[1],
    });
    }catch(error){
        console.log(error)
    }
    
};

const paginaNosotros = (req,res)=>{
    res.render('nosotros', {
        pagina: 'Nosotros'
    })
};

const paginaViajes = async (req,res)=>{
    //consultar db
    const viajes = await Viaje.findAll();
    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes,
    })
}

const paginaTestimoniales = async (req,res)=>{
    try{
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        })
    } catch (error){
        console.log(error)
    }  
}

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req,res)=>{
    const { slug } = req.params;
    try{
        const viaje = await Viaje.findOne({where: { slug: slug }});
        res.render('viaje', {
            pagina: 'Informacion Viaje',
            viaje
        })
    }catch (error){
        console.log(error)
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}