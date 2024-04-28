const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')
//require("dotenv").config

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const path = require("path")
const fs = require("fs")
const { clear } = require('console')
//const chat = require("./chatGPT")
//const { handlerAI } = require("./whisper")

/////////////////Inicio
const flowWelcome = addKeyword(EVENTS.WELCOME)
    .addAnswer("Hola!!! El ChatBot de Farina dice:", {
        delay: 100,
    },
        async (ctx, ctxFn) => {
            if (ctx.body.includes('ayuda','Ayuda')) {
                await ctxFn.flowDynamic("Pediste *ayuda!!!* 🙋‍♂️. Recuerda, escribe *opciones* ó *menú* para ir a principal!!!")
            } else {
                await ctxFn.flowDynamic("😥 Upsss!!! Escribiste otra cosa. Recuerda escribir *opciones* ó *menú* para cargar las opciones principales!!!")
            }
    },
      )

///////////////

///////////////Principal
const flowPrincipal = addKeyword(['Hola', 'ola', 'que jue', 'información', 'informacion', 'info','buenas', 'guenas',
                                  'Buenos días', 'buenos dias', 'buen dia', 'buen día',
                                  'Buenas tardes', 'buena tarde',
                                  'Buenas noches', 'buena noche',
                                  'menu', 'menú',
                                  'opcion', 'opciones', 'opción',
                                  'quiero saber', 'principal',
                                  'que tal', 'qué tal'
                                  ])
    .addAnswer('🙌 Hola!!! Soy el *ChatBot Farina*',{media: "https://gcdnb.pbrd.co/images/ATqxdS2oMbBr.png?o=1"})
    .addAnswer(
        ['Hola!!! 😀',
        ' Escoge una de las siguientes opciones (*1*, *2*, *3*, *4*, *5*, *0*): ',
        ' ',
        '👉  *1* ) ¿ Quiénes somos ?', 
        '👉  *2* ) ¿ Dónde nos ubicamos ?', 
        '👉  *3* ) Nuestros productos', 
        '👉  *4* ) Para ordenar', 
        '👉  *5* ) Contáctanos', 
        '👉  *0* ) Salir 🏆',
 
        '',
        'Escribe *ayuda* ó *menú* para regresar a principal 🙋‍♂️',
        ''
        ]
    )

//////////////


////////Salir
const flowCero = addKeyword(['0','cero','zero','bot','chatbot','chat'])
    .addAnswer('😎 INFORMACIÓN CHATBOT FARINA 😎')   
    
    .addAnswer('Steve & Bot',{media: "https://gcdnb.pbrd.co/images/wUZDB7NohiP2.jpg?o=1"})
    .addAnswer(
        [ '',
        'ChatBot Farina Ver. 1.0',
        '',
        'Esperamos que haya sido de su ayuda la implementación de esta utilidad para atender anuestros clientes',
        'Es nuestro norte y convicción el desarrollar herramientas informáticas de última generación y con implementación de IA',
        '',
        'Un cordial saludo a nombre del equipo de Panadería Farina',
        'Derechos reservados por FarinaGroup ©️ 2024 - .:FRH:.',
        '',
        '',
        '📢 Recuerda, escribe *opciones* ó *menú* para ir a principal!!!'
        ]
    )


/////////quienes somos
const flowQuienes = addKeyword(['1','FARINA','pan','italia','tradición','tradicion'])
    .addAnswer('😎 INFORMACIÓN FARINA 😎')   
    
    .addAnswer('*TRADICIÓN EN SU MESA*',{media: "https://gcdnb.pbrd.co/images/FS5UtHguuXFk.jpg?o=1"})  
    .addAnswer(
        [ '',
        '✨✨✨✨✨✨✨✨✨✨✨',
         'La tradición de hacer pan en Italia🇮🇹 se remonta a miles de años atrás, ',
         'con raíces en las civilizaciones etrusca, griega y romana. A lo largo de la historia,', 
         'el pan ha sido un alimento básico en la dieta italiana y ha desempeñado un papel fundamental',
         'en la cultura y las costumbres del país.',
         'Es por ello que en FARINA, nos hemos esforzado en traerles la tradición en la elaboración',
         'del mejor pan de la región tachirénse.',
         'Pan de excelencia, elaborado con las mejores materias primas y el arte de nuestros maestros panaderos:',
         'Por ello podemos decir:',
        '🌟 *La tradición en cada mordisco: pan🥖 artesanal hecho con amor❤️ y pasión* 🌟',
        '',
        '✨✨✨✨✨✨✨✨✨✨✨',
        '',
        '📢 Recuerda, escribe *opciones* ó *menú* para ir a principal!!!'
        ]
    )

//////

/////////ubicacion
const flowubica = addKeyword(['2'])
    .addAnswer('😎 INFORMACIÓN UBUCACION FARINA 😎')     
    .addAnswer(
        [ 'Farina Pan Artesanal',
        '',
        ' 🗺️ *No1 vereda 12, Av. Principal Unidad Vecinal* 🗺️',
        '',
        '📢 Recuerda, escribe *opciones* ó *menú* para ir a principal!!!'
        ]
    )

////////


/////////productos
const flowproducto = addKeyword(['3','producto','productos','panes'])
          .addAnswer('😎 *Productos Panadería Artesanal FARINA* 😎',)
          .addAnswer('','')
          .addAnswer('*🍔 Pan de Hamburguesa - 1$, 4.000 cop*',{media: "https://gcdnb.pbrd.co/images/Ude3uhuRvvo2.jpg?o=1"})
          .addAnswer('*🫓 Pan Pita - 1$, 4.000 cop*',{media: "https://gcdnb.pbrd.co/images/TpgyeuaqvhYr.jpg?o=1"})
          .addAnswer('*🌭 Pan de Perro - 1.5 $, 6.000 cop*',{media: "https://gcdnb.pbrd.co/images/IPn9rulNd2dQ.jpg?o=1"})
          .addAnswer('*🥖 Pan Granjero - 1$, 4.000 cop*',{media: "https://i.ibb.co/rvM30Ck/pan-granjero.jpg"})
          .addAnswer('*🥖🎄 Pan de Jamón*',{media: "https://gcdnb.pbrd.co/images/Gjy1ONwKtxEx.jpg?o=1"})
          .addAnswer('*🎂 Tortas Tradicionales*',{media: "https://i.ibb.co/2Fxtk6n/torta.jpg"})
          .addAnswer('📢 Escribe *pedido* para ordenar ó escribe *menú* para ir a principal!!! ')

///////

/////ORDENAR
const flowordenar = addKeyword(['4','pedido','pedidos','ordenar'])
          .addAnswer('😎 *Productos Panadería Artesanal FARINA* 😎',)
          .addAnswer(
            [ 'HAS TU PEDIDO EN EL SIGUIENTE LINK',
            '',
            ' 👉 *https://forms.gle/VeVMheoMxQ8fYRjz9* ',
            '',
            '*💵 Pago móvil*', 
            '*Banco Provincial - 04126521778*',
            '*Banco de Venezuela - 14041796*',
            '',
            '📢 Recuerda, escribe *opciones* ó *menú* para ir a principal!!!'
            ]
        )

//////

/////contacto
const flowocontacto = addKeyword(['5','contacto'])
        .addAnswer('😎 *Nuestro contacto - Panadería Artesanal FARINA* 😎',)
        .addAnswer(
            [ 'Para más información contáctanos a:',
            '',
            '📱 Teléfono  412-6523705',
            '🌐 Instagram:@farina.sc',
            '',
            '📢 Recuerda, escribe *opciones* ó *menú* para ir a principal!!!'
            ]
        )
/////

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowWelcome,
                                    flowPrincipal,
                                    flowCero,
                                    flowQuienes,
                                    flowubica,
                                    flowproducto,
                                    flowordenar,
                                    flowocontacto])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
