/**
 * =====================================================================
 * CONFIGURACIÓN DE LA INVITACIÓN DIGITAL (100% ESTÁTICA)
 * =====================================================================
 * Todos los datos están centralizados aquí para que puedas modificarlos
 * fácilmente sin tocar el HTML ni usar Node.js.
 * Compatible con Obsidian.
 * =====================================================================
 */

const DATOS_ANIVERSARIO = {
  tipo: "aniversario",
  pre_titulo: "Celebrando nuestro amor",
  titulo_script: "Feliz Aniversario",
  titulo: "5° Aniversario de Bodas",

  anfitriones: {
    esposo: "Yasmani Castro",
    esposa: "Yissela Castro",
    monograma: "Y & Y"
  },

  // Foto de Portada / Protagonista
  foto_principal: "principal.png",
  frase_foto: "Gracias por caminar juntos, por elegirnos cada día y por hacer de nuestro amor la mejor historia. ¡Que vengan muchos años más juntos!",

  // Texto Bíblico (Inspirado en la plantilla de /example)
  texto_biblico: {
    mostrar: true,
    cita: "Me has robado el corazón... Con tan solo una mirada de esos ojos tuyos, me has robado el corazón",
    referencia: "Can 4:9"
  },

  // Mensaje / Bendición
  mensaje_bienvenida: {
    mostrar: true,
    titulo: "Cinco Años Caminando Juntos",
    parrafos: [
      "Cinco años celebrando el amor, la complicidad y cada paso que hemos dado como familia.",
      "Nos llena de inmensa alegría compartir este día tan especial contigo, porque tu presencia le dará un significado aún más hermoso a nuestra celebración."
    ],
    firma: "Yasmani & Yissela"
  },

  // Fecha y Horario
  fecha: "2026-10-18", // Formato: AAAA-MM-DD
  hora: "13:00",       // Formato: 24h
  hora_fin: "20:00",

  // Lugar de la Celebración
  lugar: {
    nombre: "Condominio Lomas de Carabayllo, Club House",
    direccion: "Condominio Lomas de Carabayllo, Av Universitaria, costado Mercado Tambo",
    ciudad: "Carabayllo, Lima",
    maps_url: "https://maps.app.goo.gl/apAizz32TW2wtM229"
  },

  // Confirmación de Asistencia (RSVP)
  rsvp: {
    telefono: "51965635332", // WhatsApp con código de país (sin signos ni espacios)
    fecha_limite: "2026-10-10",
    mensaje_personalizado: "¡Hola Yasmani y Yissela! Confirmo con mucha alegría mi asistencia a su 5° Aniversario de Bodas el 18 de Octubre 🎉✨"
  },

  // Código de Vestimenta
  vestimenta: {
    mostrar: true,
    codigo: "Sport Elegante",
    damas: "Casual elegante",
    caballeros: "Sport elegante",
    reglas_no: [
      "Evitar prendas excesivamente informales."
    ],
    reglas_si: [
      "Traje sport y vestido casual elegante."
    ]
  },

  // Cronograma / Itinerario
  itinerario: [
    {
      hora: "13:00",
      titulo: "Recepción de Bienvenida",
      descripcion: "Copa de espumante, música acústica y bienvenida a nuestros seres queridos."
    },
    {
      hora: "13:30",
      titulo: "Sorpresas",
      descripcion: "Momentos especiales y recuerdos compartidos."
    },
    {
      hora: "15:00",
      titulo: "Música & Baile",
      descripcion: "Celebración y diversión en la pista de baile."
    }
  ],

  // Regalos / Obsequios y Encargados
  regalos: {
    mostrar: true,
    tipo: "sobre", // "sobre" | "banco" | "ambos"
    mensaje: "El mayor obsequio es contar con tu presencia en esta fecha tan significativa. Si deseas tener un detalle adicional con nosotros, comunicate con los encargados.",
    // Sección de personas encargadas para coordinar recepción de regalos
    encargados: [
      {
        nombre: "Yolanda Quispe",
        telefono: "51965635332",
        rol: "Encargada de presentes"
      }
    ]/*, banco: "BCP / Interbank / Plin",
    cuenta: "194-98765432-0-88",
    cci: "002-194-009876543208-88",
    titular: "Yasmani Castro" */
  },

  // Música de Fondo
  musica: {
    activa: true,
    audio_url: "musica.mp3", // Archivo de audio local idéntico al solicitado
    titulo: "Cantico 132",
    subtitulo: "Ahora ya somos uno"
  },

  mensaje_pie: "¡Gracias por acompañarnos a celebrar estos cinco años de amor!"
};

// =====================================================================
// EXPORTACIÓN GLOBAL
// =====================================================================
window.EVENT_DATA = DATOS_ANIVERSARIO;
