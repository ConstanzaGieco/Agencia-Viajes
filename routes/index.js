//Solo puede haber una instancia de express, lo que hacemos acá es extender la instancia con su Router.

import express from 'express';

const router = express.Router();

//Request es la petición que enviamos y response es lo que express responde
import { paginaInicio, paginaNosotros, paginaViajes, paginaTestimoniales, paginaDetalleViaje } from '../controllers/paginasController.js';
import {guardarTestimonial} from '../controllers/testimonialController.js';

router.get('/', paginaInicio);

router.get('/nosotros', paginaNosotros);

router.get('/viajes', paginaViajes);
router.get('/viajes/:slug', paginaDetalleViaje);

router.get('/testimoniales', paginaTestimoniales);
router.post('/testimoniales', guardarTestimonial);

export default router