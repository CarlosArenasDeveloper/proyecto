-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 13-06-2021 a las 22:18:23
-- Versión del servidor: 10.3.27-MariaDB-0+deb10u1
-- Versión de PHP: 7.3.19-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `daw2021a2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividades`
--

CREATE TABLE `actividades` (
  `id` int(11) NOT NULL,
  `email_monitor` varchar(50) DEFAULT NULL,
  `id_tarifa` int(11) DEFAULT NULL,
  `nombre` varchar(25) NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  `imagen` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `actividades`
--

INSERT INTO `actividades` (`id`, `email_monitor`, `id_tarifa`, `nombre`, `descripcion`, `imagen`, `color`) VALUES
(21, NULL, 3, 'Spinning', 'Bike es una actividad dirigida que consiste en un entrenamiento de resistencia cardiovascular sobre bicicletas estáticas de resistencia variable al ritmo de la mejor música.\n\n¡Ven a disfrutar!', 'bike.png', '#EA1407'),
(22, 'zidane@hotmail.com', 2, '5 x 4 ', 'En esta actividad trabajarás intercalando ejercicios de fuerza con ejercicios cardiovasculares en formato Tabata.\n\nLa sesión está formada en 5 bloques de esfuerzo de 4 minutos cada uno. En cada bloque trabajarás con una orientación distinta, convirtiendo esta clase en una sesión de acondicionamiento físico general plena.\n\n5×4 es una clase intensa, rápida, efectiva y muy divertida.', 'cincoporcuatro.png', '#DFD907'),
(23, 'luis@hotmail.com', 1, 'Box', 'Box es una actividad cardiovascular inspirada en diferentes movimientos de artes marciales siempre coreografiados.\n\nEn esta clase realizarás secuencias y “combos” de movimientos que te harán mejorar tu coordinación, tu tono muscular, y por supuesto liberarás estrés mientras golpeas al mejor ritmo musical.', 'box.png', '#7ADF07'),
(24, 'guardiola@hotmail.com', 1, 'Aerobic', 'Una divertida sesión creada para realizar un buen trabajo que combina entrenamiento cardiovascular y coreográfico. La suma de movimientos de alto y bajo impacto, junto con la mejor música, hacen que sea un tipo de clase muy dinámica.\n\nIndicado o recomendado para personas con un nivel medio de condición física.', 'aerobic.png', '#07DFCB'),
(25, 'mou@hotmail.com', 1, 'Yoga', 'Técnica que trabaja la mente, el cuerpo y el espíritu. Es practicable por cualquier persona y edad, favoreciendo rápidamente la mejora de la flexibilidad, el tono muscular y el estado físico en general', 'yoga.png', '#DF8107'),
(26, 'zidana@hotmail.com', 2, 'Pilates', 'Método de ejercicio y movimiento físico diseñado para estirar, fortalecer y equilibrar el cuerpo mediante una secuencia de ejercicios creada por Joseph Pilates.', 'pilates.png', '#A407DF'),
(27, 'c@h.comd', 2, 'GAP', 'Glúteos, abdominales y piernas, como su propio nombre indica, trabajamos la fuerza en estos grupos musculares para conseguir un desarrollo completo de los miembros inferiores y el abdomen.', 'gap.png', '#DF0787'),
(28, 'luz@hotmail.com', 3, 'Motrix Express', 'Sesión de entrenamiento funcional de 30 minutos dirigida a personas que quieran prevenir la limitación de movimiento y el deterioro funcional producido por la edad. La mejor opción para mantenerte en forma y saludable independientemente de tu edad.', 'motrix.png', '#FF8CAA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`) VALUES
(37, 'Nutricion'),
(38, 'Ejercicio'),
(39, 'Descanso'),
(40, 'Motivacion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centros`
--

CREATE TABLE `centros` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `telefono` int(11) NOT NULL,
  `latitud` double NOT NULL,
  `longitud` double NOT NULL,
  `ubicacion` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `centros`
--

INSERT INTO `centros` (`id`, `nombre`, `direccion`, `telefono`, `latitud`, `longitud`, `ubicacion`) VALUES
(1, 'Fit & healthy cordoba', 'Avenida de los piconeros', 654567894, 37.89446644513024, -4.775673551044471, 'https://www.google.es/maps/place/GO+fit+C%C3%B3rdoba/@37.8943098,-4.7782163,17z/data=!3m1!4b1!4m5!3m4!1s0xd6cdf701a5ad957:0x3dc8fac2bcbb18ac!8m2!3d37.8943056!4d-4.7760276'),
(2, 'Fit & healthy malaga', 'Calle Larios', 676434343, 36.71963852859954, -4.421430163380269, 'https://www.google.es/maps/place/Calle+Marqu%C3%A9s+de+Larios,+M%C3%A1laga/@36.719473,-4.4237637,17z/data=!3m1!4b1!4m5!3m4!1s0xd72f795b1a4f35f:0xf3d44789b8b0e006!8m2!3d36.7194687!4d-4.421575'),
(3, 'Fit & healthy sevilla', 'Estadio Ramón Sánchez-Pizjuán', 678732334, 37.38419335406874, -5.970625829629611, 'https://www.google.es/maps/place/Estadio+Ram%C3%B3n+S%C3%A1nchez-Pizju%C3%A1n/@37.3840697,-5.9728789,17z/data=!3m1!4b1!4m5!3m4!1s0xd126ebd0479b657:0x62ff222e3173860!8m2!3d37.3840655!4d-5.9706902'),
(4, 'Fit & healthy Granada', 'Calle Arabial, 95', 676665432, 37.17688315528452, -3.6118250608559435, 'https://www.google.es/maps/place/Centro+Log%C3%ADstico+VivaGym/@36.7010354,-6.1242136,14.25z/data=!4m5!3m4!1s0xd0dc6dbc5a6a473:0xb198b8972b260c3a!8m2!3d36.6971606!4d-6.1163431');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colores`
--

CREATE TABLE `colores` (
  `codigo` varchar(50) CHARACTER SET utf8mb4 NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `colores`
--

INSERT INTO `colores` (`codigo`, `nombre`) VALUES
('#07DFCB', 'azul cielo'),
('#345D0C', 'verde oscuro'),
('#6C4675', 'lila'),
('#7ADF07', 'verde'),
('#804000', 'marron'),
('#A407DF', 'morado'),
('#C0C1BD', 'gris'),
('#DF0787', 'fucsia'),
('#DF8107', 'naranja'),
('#DFD907', 'amarillo'),
('#EA1407', 'rojo'),
('#FF8CAA', 'rosa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejercicios`
--

CREATE TABLE `ejercicios` (
  `id` int(11) NOT NULL,
  `nombre_musculo` varchar(50) DEFAULT NULL,
  `nombre` varchar(50) NOT NULL,
  `nivel` enum('principiante','intermedio','avanzado') NOT NULL,
  `equipo` varchar(50) NOT NULL,
  `tipo` enum('basico','multifuncional','analitico') NOT NULL,
  `descripcion` varchar(2000) NOT NULL,
  `imagen` varchar(50) DEFAULT NULL,
  `video` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ejercicios`
--

INSERT INTO `ejercicios` (`id`, `nombre_musculo`, `nombre`, `nivel`, `equipo`, `tipo`, `descripcion`, `imagen`, `video`) VALUES
(1, 'pectoral', 'Press banca', 'intermedio', 'Barra recta', 'basico', 'Sin duda, uno de mis ejercicios favoritos (y el de muchos) por su efectividad a la hora de entrenar los pectorales. Sin embargo, como siempre recalcamos la ejecución y técnica del ejercicio es lo que te ayudará a desarrollar las máximas ganancias musculares evitando lesiones.\r\n\r\nEste ejercicio trabaja el pectoral mayor cabeza esternal (inferior) cómo músculo objetivo, pero también se ven involucrados músculos como: pectoral mayorclavicular (superior), deltoides anterior, tríceps braquial. Al participar tantos músculos, se le llama ejercicio compuesto y está clasificado como uno de los ejercicios esencial en los entrenamientos de gimnasio. ¿Quieres descubrir cómo hacer el press de banca con barra? ¡Vamos!', 'image.jpg', NULL),
(3, 'triceps', 'Press frances', 'principiante', 'Barra o mancuernas, banco', 'analitico', 'El press francés o rompecráneos es un ejercicio completamente de aislamiento que ha sido utilizado de muchas formas en el mundo deportivo, a través de diferentes tipos de levantamiento de pesas. De hecho, es uno de los ejercicios que genera mayor estimulación a nivel del grupo muscular del tríceps.', 'pressfrances2.png', 'https://www.youtube.com/watch?v=Loxe7Gh-fwc'),
(5, 'pectoral', 'Press declinado con barra', 'principiante', 'Barra recta', 'multifuncional', 'El press declinado con barra, es otro tipo del press tradicional. No obstante, se trata de un ejercicio que debemos llevar a cabo si queremos conseguir una simetría en el desarrollo de los músculos.\n\nAlgunos de los principales grupos musculares que se van a trabajar con el press declinado con barra es la zona inferior de los pectorales, principalmente el pectoral mayor esternal. Así mismo trabajan como sinergistas músculos como: deltoides anterior, pectoral mayor cabeza clavicular, tríceps braquial.', '', ''),
(6, 'pectoral', 'Cruces en polea baja', 'intermedio', 'Máquina de poleas con asas', 'analitico', 'Unos pectorales grandes y bien definidos se ven increíbles en cualquier hombre y muy útiles en su involucración indirecta. Realizar cruces en polea baja es una muy buena opción para todas aquellas personas que desean tonificar su pecho (principalmente parte superior).', '', ''),
(7, 'pectoral', 'Apertura con mancuernas en banco', 'principiante', 'Mancuernas, banco plano', 'analitico', 'Los ejercicios que se llevan a cabo en banco plano acostumbran a ser perfectos para poder mejorar el aspecto y fuerza de la región de los pectorales. Son abundantes los ejercicios que se pueden efectuar en el banco plano si se desea trabajar de forma realmente efectiva la región, mas en esta ocasión hablaremos de la apertura con mancuernas en banco plano.\n\nLos músculos que se trabajan con la apertura con mancuernas en banco plano son el esternocostal del pectoral mayor, la zona de los hombros y los pectorales. En suma, se trata de un ejercicio del que se necesita cierto nivel de esfuerzo muscular', '', ''),
(8, 'dorsal', 'Remo sentado en polea baja', 'principiante', 'Máquina de poleas', 'multifuncional', 'Posición inicial\nSiéntese en la máquina de polea baja y agarre la barra recta con un agarre supino de ancho de hombros.\nEnderece la espalda y deslice los glúteos hacia atrás. El cable ha de estar tenso y los brazos y los hombros han de estar estirados hacia adelante.\nEjecución del ejercicio\nSosteniendo los codos cerca de su cuerpo, tire de la barra hacia su abdomen mientras exhala.\nSaque el pecho y apriete los músculos de la espalda, cuente un par de segundos.\nInhale mientras que retorna la barra a la situación inicial (sin curvear la espalda), con los brazos y los hombros estirados hacia adelante.\nRepetir de acuerdo a tu plan.', '', ''),
(9, 'dorsal', 'Remo con barra en banco inclinado', 'intermedio', 'Barra recta, banco inclinado', 'multifuncional', 'Si buscas ejercitar la espalda a nivel trapecio y al mismo tiempo los músculos de los brazos, el remo con barra en banco inclinado es un genial ejercicio. Es fundamental que aprendas a llevar a cabo de manera correcta la técnica para lograr los objetivos deseados y, así, poder eludir lesiones, contracturas o cualquier tipo de problema. A continuación, te decimos cómo realizar este ejercicio.\n\nLos músculos que se trabajan con el remo con barra o mancuernas en banco inclinado son: los trapecios medio e inferior, así como, infraespinoso, deltoides posterior, bíceps y braquiales.', '', ''),
(10, 'biceps', 'Curl bíceps inclinado con mancuernas', 'principiante', 'Mancuernas, banco inclinado', 'analitico', 'El curl de bíceps inclinado es un ejercicio perfecto para potencia la musculatura principalmente los bíceps hasta el antebrazo. Se trata de un ejercicio que implica un movimiento muy sencillo de hacer y que es ampliamente conocido en el mundo de fisicoculturismo.\n\nEntre los músculos que vamos a trabajar con el curl de bíceps inclinado con mancuerna se encuentran el deltoides precedente, el bíceps, el braquial, así como los flexores de cadera, entre otros.', 'motrix.png', ''),
(11, 'biceps', 'Curl martillo con mancuernas', 'principiante', 'Mancuernas', 'analitico', 'Una de las variantes correspondientes a los ejercicios más populares del mundo fitness, es el curl de bíceps, específicamente el curl martillo.\n\nEste ejercicio además de permitirnos trabajar el bíceps, permite que otros músculos de la periferia y cercanos al mismo puedan ser trabajados, logrando aumentar el volumen y la forma.', '', ''),
(12, 'triceps', 'Extensión en polea con cuerda sobre la cabeza', 'avanzado', 'Cuerda, polea', 'analitico', 'Todos los movimientos de extensiones, como la extensión en polea con cuerda sobre la cabeza, son perfectos para potenciar la musculatura del tren superior, ya sea de hombros, espalda, tríceps o bíceps.\n\nEn específico, se trabajarán con este tipo de extensión, la cabeza media y lateral del tríceps, en menor medida el bíceps y trapecio.\n\nA continuación, te hablamos más sobre la extensión en polea con cuerda sobre la cabeza, su técnica de ejecución, así como errores y consejos frecuentes.', 'extensionpolea.png', 'https://www.youtube.com/watch?v=_QoXF6kW2TE&ab_channel=SergioCrespoEP'),
(13, 'triceps', 'Extensión de tríceps tras nuca con mancuerna', 'intermedio', 'Mancuerna, banco plano ', 'analitico', 'La extensión de tríceps tras nuca con mancuerna, a semejanza de otras variantes de la elevación tras nuca, es un ejercicio enfocado a trabajar la musculatura de la espalda, los hombros y los brazos, permitiendo incluirla en diversas rutinas que buscan potenciar la musculatura del tren superior.\n\nSe trata de una variante con relativa dificultad, por lo que es mejor conocer la técnica de ejecución, con el fin de evitar lesiones en la zona de los hombros, codos y muñecas; además de que de esta manera podremos sacarle el máximo provecho al ejercicio.\n\nEn la extensión de tríceps tras nuca con mancuerna, trabajaremos los músculos del tríceps, pectoral mayor, trapecio y hombros.', 'nuca.png', 'https://www.youtube.com/watch?v=T2fHS9ubLLY&ab_channel=BryanSl%C3%B3pezBryanSl%C3%B3pez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `musculosprincipales`
--

CREATE TABLE `musculosprincipales` (
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `imagen` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `musculosprincipales`
--

INSERT INTO `musculosprincipales` (`nombre`, `descripcion`, `imagen`) VALUES
('Abdominales', 'Los abdominales son los músculos que se encuentran en el abdomen, los cuales fundamentalmente cumplen tres funciones: sirven de apoyo al tronco superior, permiten el movimiento de este y hacen que los órganos internos se mantengan dentro de la cavidad abdominal.', 'abdomen.png'),
('biceps', 'Es un músculo ubicado en la región superior del brazo, dividido en dos porciones o cabezas: corta y larga. No esperes más, maximiza tus ganancias musculares en bíceps con los siguientes ejercicios.', 'biceps.png'),
('Cuadricep', 'El músculo cuádriceps femoral es el músculo más voluminoso de todo el cuerpo humano. Es el que soporta todo el peso del cuerpo humano y nos permite andar, caminar, sentarnos y correr. Se denomina cuádriceps debido a que tiene cuatro cabezas musculares. Se encuentra en la cara anterior del fémur.', 'cuadriceps.png'),
('dorsal', 'El dorsal ancho (lattissimus dorsi), es un músculo grande ancho y aplanado que recubre la parte posterior del tronco extendiéndose desde la región lumbar hasta el húmero. Es un músculo potente que interviene en muchas acciones deportivas y frecuentemente puede ser foco de dolor.', 'espalda.png'),
('Gemelo', 'Está ubicado sobre el músculo sóleo y se extiende desde los cóndilos femorales, porción superior, hasta el tendón calcáneo en su porción inferior. Es voluminoso, oval, aplanado, con dos cabezas: «medial» y «lateral». Se dice que es un músculo biauricular ya que en su trayecto atraviesa dos articulaciones, la de la rodilla y la del tobillo.', 'gemelos.png'),
('hombro', 'Los hombros son la parte del cuerpo más olvidada en el gimnasio y ¡una de las más importantes!. Son muy funcionales para hacer todo tipo de movimientos de rotación del brazo, además, al desarrollarlos ayudará a mejorar la forma de “V” de tu espalda. ¡Entrénalos ya!', 'hombros.png'),
('pectoral', 'El pectoral mayor es un músculo resistente, grueso y ancho por lo que su entrenamiento debe ser constante e intenso para lograr el máxima desarrollo muscular. A continuación, te sugerimos los mejores ejercicios que podrás explorar de cómo hacerlos, sus beneficios y consejos para mejorar.', 'pectoral.png'),
('triceps', 'Es un músculo ubicado en la región posterior del brazo. Se divide en tres cabezas que abarcan el 60% de la masa muscular del brazo (¡son más grandes que los bíceps!). Comienza a ejercitar tus tríceps para tener brazos más grandes y armónicos.', 'triceps.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticias`
--

CREATE TABLE `noticias` (
  `id` int(11) NOT NULL,
  `email_usuario` varchar(50) DEFAULT NULL,
  `titulo` varchar(100) NOT NULL,
  `cuerpo` longtext NOT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `visible` tinyint(1) NOT NULL,
  `fecha` date NOT NULL,
  `fecha_edit` date DEFAULT NULL,
  `imagen` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `noticias`
--

INSERT INTO `noticias` (`id`, `email_usuario`, `titulo`, `cuerpo`, `id_categoria`, `visible`, `fecha`, `fecha_edit`, `imagen`) VALUES
(4, 'c@h.com', 'Conoce los beneficios de la corteza del arbol africano borututu.', 'La corteza de Borututu proviene de un árbol africano y es conocida por sus beneficios contra ciertas dolencias, especialmente las enfermedades hepáticas (hígado graso, cálculos en la vesícula biliar) y como método de limpieza del organismo.\n\nTomar corteza de Borututu tiene un impacto muy positivo en nuestro organismo, ya que actúa como:\n\nDepurador de la sangre\nTiene alto contenido en antioxidantes\nElimina las toxinas de algunos alimentos y del medio ambiente\nEvita la propagación de metabólicos tóxicos de alcohol\nProtege varios órganos vitales\nEstos beneficios hacen que la corteza del árbol africano sea perfecta para personas con el colesterol alto, diaetes, personas con problemas de piel como el herpes, entre otros. Además, te ayuda a proteger los riñones, hígado e intestinos por su acción limpiadora del organismo.', 37, 1, '2021-05-03', '2021-05-26', 'borututu.png'),
(5, 'c@h.com', '¿Por qué somos tan exigentes con nosotros mismos?', 'Es hora de disfrutar de todo lo que has conseguido\nAún en plena pandemia, ya casi no tenemos en cuenta que llevamos más de un año con este virus en boca de todos. La COVID-19 se ha convertido en el tema central de nuestra vida, ya que dicta como nos debemos comportar en el día a día. La mayoría de esas medidas ya forman parte de nosotros y se puede decir que nos hemos acostumbrado a salir a la calle sin olvidarnos de las llaves, de la mascarilla, e incluso del gel hidroalcohólico.\n\nSin embargo, todo este año de restricciones, cambios y distancia social está claro que puede llegar a generar en nosotros sentimientos como el miedo, la inseguridad, la ansiedad, preocupación, o incluso algo que ya se conoce comúnmente como fatiga pandémica.\nAl mismo tiempo, nuestra vida sigue, y probablemente sintamos que la realidad nos afecta aunque no podamos controlarla. Seguimos siendo igual de exigentes con nosotros mismos o incluso más, ya que esta situación es probable que se nos esté yendo de las manos y la ansiedad vaya en aumento.', 40, 1, '2021-05-04', '2021-05-26', 'exigente.png'),
(7, 'zidane@hotmail.com', '4 razones para apuntarte al club de runners.', 'Si eres apasionado o quieres empezar a practicarlo, sea cual sea tu nivel, puedes participar en nuestro Club de Corredores GO fit.\nUna de las razones por las cuales se pierde la continuidad de practicar running es por la falta de motivación, perseverancia y fuerza de voluntad inicial durante las primeras experiencias. No llegas a sentir adhesión por correr, y puede incluso en convertirse en una carga para tu tiempo libre. \nTanto si eres un corredor experimentado como si quieres iniciarte en las carreras, tienes un lugar en el Club de Runners de nuestros centros deportivos GO fit.\n\nLa programación de esta actividad está orientada a la participación en carreras populares. El Club de Runners pone a tu disposición un entrenador que te guiará y asesorará en la práctica de este deporte para que alcances los mejores resultados de forma individual y en grupo.\n\nSi todavía no estás convencido, te damos 4 motivos por los que hay que formar parte de este club:\n\nHacer ejercicio en grupo siempre es más divertido que hacerlo uno solo.\nConsigue sacar lo mejor de ti deportivamente, ya que siempre hay alguien que tira de ti y te hace salir de tu zona de confort y esforzarte más.\nIr a carreras y competir te permite medir realmente tu mejora y reforzar las ganas de seguir entrenando, marcándote diferentes objetivos individuales orientado por el entrenador.\nCada día de entrenamiento durante la semana es totalmente diferente. Hay días de cuestas, de series, de técnica de carrera, de velocidad, rodajes largos, rodajes cortos e incluso trabajo de fuerza y potencia. Cada día es un aprendizaje diferente por lo que es imposible aburrirse.', 38, 1, '2021-05-06', '2021-05-25', 'runner.png'),
(8, 'zidane@hotmail.com', 'Los beneficios del Power Snap', 'El Power Snap es un sueño de entre 15 a 20 minutos, no más, unos 30-40 minutos antes del entrenamiento de intensidad. Este pequeño descanso tiene múltiples efectos positivos en tu organismo, tanto fisiológicos como psicológicos.\n\nUna manera fácil de conseguir un poco de relajación y reducir la fatiga mental: Entendamos que uno de los factores determinantes para tu entrenamiento es tu capacidad de concentración, y esta se verá alterada si no consigues mantener la atención sobre el entrenamiento, o dicho de otra forma, si estás alterado por factores externos que no forman parte del entrenamiento. Cuando te sientes “despistado” o despistada” tu motivación baja y tu fatiga mental aumenta, el Power Snap te puede ayudar a mantener la concentración durante todo tu entrenamiento.\nReduzca el estrés y la pertuvación después de una noche corta. De la mano del punto anterior, por estrés, ansiedad, conexión digital… Nuestras noches son cada vez más cortas, la calidad y la cantidad de sueño es mucho más reducida en la sociedad actual. Esto, además de problemas a largo plazo, obviamente influye en tu estado de ánimo y por supuesto, en tu entrenamiento. Es fundamental mantener la motivación para conseguir resultados, y el estrés es el enemigo número uno de esto. Por ello, se vuelve vitar usar todo tipo de estrategias para reducirlo, siendo el Power Snap una de ellas.\nInvertir el impacto hormonal: Todo lo que ocurre en el cuerpo humano se regula a través de las hormonas y si observamos con atención los dos puntos anteriores, entenderemos que afectan directamente a nuestro sistema hormonal, disparando hormonas “negativas” como cortisol. Tomarte este pequeño descanso puede ayudar a regular la producción de estas hormonas y contribuir a un proceso hormonal más normal.\nRestaurar tu foco y ayudar a promover el aprendizaje: Algo fundamental en el entrenamiento es tu capacidad de “aprender movimientos” y este proceso se vuelve tedioso, incluso imposible, si la fatiga mental es elevada. Seguro que alguna vez te has “sentido torpe” y no os aseguramos que no es que no supieses realizar el movimiento, si no que era tal el nivel de fatiga psicológica, que deriva en fatiga muscular, el Power Snap puede ayudar a reducir estas sensaciones y mejorar tu capacidad de aprendizaje técnico.\nCafeína antes de dormir: aunque parezca contradictorio, la bibliografía denota que una ligera ingesta de cafeína previa al Power Snap (150mg máximo), puede facilitar todos los aspectos antes nombrados.\nComo vemos, dentro de todas las estrategias de reducir fatiga y/o recuperación, el Power Snap se debe de contemplar como una de ellas, por su facilidad y sus múltiples beneficios.\n', 39, 1, '2021-05-07', '2021-05-26', 'powersnap.png'),
(116, 'c@h.com', 'Derriba el mito, entrenar la fuerza es beneficio tanto para hombres como para mujeres.', 'Muchas veces cuando hablamos de entrenar fuerza, automáticamente se nos viene a la cabeza la imagen de una persona muy musculada y levantando grandes cargas, pero nada más lejos de la realidad.\n\nEl entrenamiento de fuerza es vital para conseguir cualquier objetivo, ya sea rendimiento, estética o salud. Si bien esto solemos tenerlo muchas veces claro, todavía el entrenamiento de fuerza en mujeres suele convertirse en un “tabú”. Sin embargo, cuando hablamos de hacer “tonificación” vemos claramente cual es el fin y el objetivo de los entrenamientos. Sin embargo, la realidad es que la tonificación, no existe.\n\nLos músculos están preparados para el movimiento y el movimiento, es contracción, es decir, fuerza. Cuando interiorizamos esto, podemos valorar que, aunque es cierto que las fibras musculares tienen una propiedad a la que llamamos stifness (tensión muscular), esto no se puede confundir con “tonificación”, porque el stifness se produce gracias al entrenamiento con cargas altas y velocidades máximas (aunque esta presente en cualquier entrenamiento de fuerza). Sin embargo, solemos aplicar entrenamiento de “tonificación” a cargas bajas y muchas repeticiones, así que vemos claramente lo incongruente que es, si queremos “un músculo más duro (tenso) entrenar de esta forma.\n\nPor ello, debemos entender que lo que comúnmente denominamos “tonificación” no es más que la causa y/o efecto de un entrenamiento de fuerza (sea cual sea) y una reducción del porcentaje graso, pero no existe una metodología y/o sistema de entrenamiento para “tonificación”, por eso decimos que no existe.\n\nAhora que has llegado hasta aquí, queremos exponerte que los resultados, tantos estéticos como de rendimiento, tanto en hombres como en mujeres, requieren de una carga y dosis de entrenamiento muy bien prescrita y medida. Pero esta complejidad suele ser mayor en las mujeres, por el entorno hormonal más cambiante mensualmente, ya que las hormonas tales como progesterona o estrógenos afectan directamente a la capacidad de producción de fuerza y fatiga muscular.\n\nEn definitiva, todos, hombres y mujeres, todos debemos entrenar fuerza, también con cargas altas, también con velocidades altas, y por supuesto jugar con todas las variables de entrenamiento que tenemos y no solo focalizar el entrenamiento en el aspecto cardio vascular, sea cual sea su propósito final en GO fit.', 38, 1, '2021-05-08', '2021-05-17', ''),
(120, 'guardiola@hotmail.com', '¿Para que se utilizan los ejercicios analiticos?', 'Para la rehabilitación: evidentemente cuando hay un músculo dañado, en una primera fase el trabajo debe ser únicamente analítico, hasta que está “preparado” para trabajar en conjunto, momento en el que se empezarán a utilizar ejercicios de cadena cinética corta, para pasar más adelante a cadenas cinéticas más largas y a los movimientos de competición.\nPara la prevención: los puntos débiles sean del propio deportista o de la modalidad (es decir los eslabones más débiles de la cadena). Antiguas lesiones, carencias personales o prevención de lesiones habituales de un deporte en concreto, y para que no haya problemas trabajar también de manera paralela este trabajo con el de cadena cinética corta.', 38, 1, '2021-05-09', '2021-05-25', 'analiticos.png'),
(121, 'carlos_arenas_99@hotmail.com', 'Estimula tu salud. Gana calidad de vida', '¡Gana felicidad, gana bienestar!\nEn Fit & Healthy sabemos que el aumento y la estimulación de las endorfinas están relacionadas con las sensaciones de felicidad y satisfacción. Uno de los beneficios que tiene la realización de ejercicio físico pautado es el aumento de los niveles de endorfinas, la deseada hormona de la felicidad, que ayuda a regular la ansiedad, libera estrés y calma al cuerpo.\n\nLas actividades dirigidas con mayor carga “endorfínica” son aquellas que combinan alta intensidad con ejercicio cardiovascular. Un buen ejemplo son Box y Bike, muy propicias para la descarga de estrés.\n\nPero no son las únicas. Actividades como Yoga o Pilates generan un impacto directo de felicidad y relajación en el cerebro a través de los neurotransmisores. La práctica habitual de estas disciplinas te ayudará a controlar la ansiedad propia del día a día.\n\nNo lo olvides, la alimentación también es fundamental. Una dieta desequilibrada o llena de ultraprocesados afectan negativamente a tu organismo con muchos efectos secundarios. Una alimentación completa y equilibrada es vital para mantener un buen estado de salud.', 40, 1, '2021-05-17', '2021-05-26', 'estimula.png'),
(122, 'c@h.com', 'Receta sin alcohol para darle la bienvenida al buen tiempo.', 'Smoothie de mango, piña y lima.\nIngredientes:\n\n200 g de mango pelado\n300 ml de zumo de piña\nZumo y ralladura de una lima\nElaboración: \n\nComenzamos pelando el mango y cortándolo en trozos pequeños.\n\nLos ponemos en un recipiente apto para el congelador y congelamos la fruta durante un mínimo de dos horas.\n\nUna vez pasado el tiempo, echamos los trozos de mango congelados en el vaso de una batidora o robot de cocina, añadimos el zumo de piña, el zumo de lima y la ralladura, reservando una pequeña cantidad para decorar.\n\nTrituramos todo con la batidora hasta que espese y no veamos trozos de mango sin triturar. Ponemos el smoothie en vasos, decoramos con la ralladura de lima y unas hojas de hierbabuena. Servimos inmediatamente.', 37, 1, '2021-05-11', '2021-05-25', 'receta.png'),
(125, 'guardiola@hotmail.com', 'Torrijas Fitness (Sin gluten ni lactosa)', 'Si hay algo que a la mayoría nos gusta de la Semana Santa es sin duda la venerada torrija. Este dulce tan típico de estas fechas levanta pasiones, sin duda, pero también despierta el recelo de muchos que, contra su voluntad, intentan evitar darse el gusto para así huir de las cantidades de azúcares que trae consigo esta rebanada. Y es que… ¿Sabías que una torrija aporta 566 kcal? Para quemarla necesitarías andar durante 147 minutos o correr de forma intensa durante 61 minutos.\n\nAunque tranquil@, si estás llevando una dieta estricta y no te permites ni un solo “desliz” (de vez en cuando no viene mal uno), aquí te dejamos la solución: ¡las torrijas fitness!\n\n¡¡Estas torrijas hechas sin gluten, sin lactosa y sin azucares ni grasas reducen su valor energético a 171 kcal!!\nAquí os dejamos la receta con los ingredientes necesarios para prepararlas.\n\nPara una torrija:\n\nSustituir los 50 g de pan blanco por 40 g de pan integral o pan integral sin gluten\nEl medio vaso de leche entera por medio vaso de leche desnatada, de soja, almendras o sin lactosa desnatada\nLos 7 g de azúcar por unas gotas de edulcorante stevia.\nLos 40 g de huevo, por 40 g de clara de huevo\nEn vez de freír en sartén con aceite, meter al horno bien caliente para que queden crujientes por fuera y blandas por dentro\nY después se espolvorean con canela y stevia en grano.\nNo es necesario privarse de algunos postres, si no saber cómo prepararlos.\n\n¡¡Feliz Semana Santa!!', 37, 1, '2021-05-12', '2021-05-26', 'torrijas.png'),
(126, 'zidane@hotmail.com', 'Descubre todo lo que hace tu cuerpo mientras duermes.', 'El sueño es un proceso biológico muy importante que impacta de forma directa en tu salud. Dormir bien es vital para tu productividad durante el día, la salud de tu cerebro, tu estado físico y de ánimo entre otras cosas. \n\nDurante la noche, el cerebro atraviesa 4 fases del sueño. Veamos brevemente de qué va cada una. \n\nFase 1: Apenas te duermes tienes un sueño muy ligero en el que cualquier estímulo puede despertarte. Esta etapa se asocia con la memoria muscular, es decir, la fijación de los movimientos aprendidos durante el día.\n\nFase 2: Aquí ya empiezas a adentrarte en un sueño más profundo y tu actividad cerebral desciende. Es la etapa en la que produces la hormona de crecimiento (GH), que no sólo sirve cuando eres niño o adolescente, sino que se ocupa del crecimiento del tejido muscular y de regular el metabolismo. \n\nFase 3: La instancia de sueño más profundo y reparador, en la que disminuye notablemente la actividad cerebral y, por tanto, aumenta el flujo de sangre hacia los músculos. Esto los llena de oxígeno y nutrientes fundamentales que reparan el tejido dañado durante el día (gracias a la liberación de la hormona prolactina) y favorecen el aumento de masa muscular. \n\nFase 4: La última etapa se conoce como REM (rapid eye movement) y en ella tu cerebro trabaja muy activamente, por eso tienes sueños vividos. Esta parte del sueño es la que le da energía al cerebro para funcionar bien durante el día. ', 39, 1, '2021-05-17', '2021-05-25', 'dormir.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` int(11) NOT NULL,
  `email_cliente` varchar(50) NOT NULL,
  `id_sesion` int(11) DEFAULT NULL,
  `estado` enum('realizada','pendiente','cancelada') NOT NULL DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id`, `email_cliente`, `id_sesion`, `estado`) VALUES
(11, 'maria@hotmail.com', 6, 'realizada'),
(12, 'maria@hotmail.com', 10, 'cancelada'),
(13, 'maria@hotmail.com', 17, 'pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(10) NOT NULL,
  `nombre` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`) VALUES
(1, 'administrador'),
(2, 'cliente'),
(3, 'monitor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salas`
--

CREATE TABLE `salas` (
  `id` int(11) NOT NULL,
  `aforo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `salas`
--

INSERT INTO `salas` (`id`, `aforo`) VALUES
(1, 2),
(2, 3),
(3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesiones`
--

CREATE TABLE `sesiones` (
  `id` int(11) NOT NULL,
  `title` int(11) DEFAULT NULL,
  `start` varchar(50) NOT NULL,
  `end` varchar(50) NOT NULL,
  `sala` int(11) DEFAULT NULL,
  `color` varchar(25) NOT NULL,
  `num_clientes` int(11) NOT NULL DEFAULT 0,
  `estado` enum('completa','incompleta','finalizada','cancelada') NOT NULL DEFAULT 'incompleta'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sesiones`
--

INSERT INTO `sesiones` (`id`, `title`, `start`, `end`, `sala`, `color`, `num_clientes`, `estado`) VALUES
(1, 22, '2021-06-03T13:45:28.343Z', '2021-06-03T14:45:28.343Z', 1, '#DFD907', 0, 'finalizada'),
(2, 24, '2021-06-03T15:47:31.258Z', '2021-06-03T16:47:31.258Z', 2, '#07DFCB', 0, 'finalizada'),
(3, 23, '2021-06-03T18:47:45.380Z', '2021-06-03T19:47:45.380Z', 3, '#7ADF07', 0, 'finalizada'),
(4, 22, '2021-06-03T14:48:05.214Z', '2021-06-03T15:48:05.214Z', 1, '#DFD907', 0, 'finalizada'),
(5, 25, '2021-06-04T08:00:00.000Z', '2021-06-04T09:00:00.000Z', 2, '#074CDF', 0, 'cancelada'),
(6, 21, '2021-06-04T22:00:00.000Z', '2021-06-05T00:00:00.000Z', 2, '#EA1407', 0, 'finalizada'),
(7, 26, '2021-06-08T12:00:00.000Z', '2021-06-08T13:00:00.000Z', 3, '#A407DF', 0, 'cancelada'),
(9, 22, '2021-06-10T03:00:00.000Z', '2021-06-10T04:00:00.000Z', 2, '#DFD907', 0, 'finalizada'),
(10, 26, '2021-06-06T08:00:00.000Z', '2021-06-06T09:00:00.000Z', 1, '#A407DF', 0, 'finalizada'),
(11, 24, '2021-06-04T08:21:08.997Z', '2021-06-04T09:21:08.997Z', 1, '#07DFCB', 0, 'finalizada'),
(12, 22, '2021-06-12T03:00:00.000Z', '2021-06-12T04:00:00.000Z', 2, '#DFD907', 0, 'cancelada'),
(13, 22, '2021-06-07T18:38:06.933Z', '2021-06-07T19:38:06.933Z', 2, '#DFD907', 0, 'finalizada'),
(14, 24, '2021-06-08T23:00:49.205Z', '2021-06-09T00:00:49.205Z', 1, '#07DFCB', 0, 'cancelada'),
(15, 22, '2021-06-12T23:00:00.000Z', '2021-06-12T23:30:00.000Z', 1, '#DFD907', 0, 'finalizada'),
(17, 24, '2021-06-14T00:02:00.000Z', '2021-06-14T00:03:00.000Z', 1, '#07DFCB', 1, 'incompleta'),
(18, NULL, '2021-06-15T22:00:00.000Z', '2021-06-15T23:00:00.000Z', 1, '#345D0C', 0, 'cancelada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarifas`
--

CREATE TABLE `tarifas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `precio` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tarifas`
--

INSERT INTO `tarifas` (`id`, `nombre`, `descripcion`, `precio`) VALUES
(1, 'classic', 'Tarifa recomendada para aquellos que apenas vayan a asistir a clases y que pasarán el mayor tiempo en la sala de musculacion.', 14.99),
(2, 'premium', 'La tarifa más equilibrada!. Con ella podrás asistir a multiples clases y disfrutar de la sala de musculación cuando te apetezca!. No te defraudará.', 24.99),
(3, 'Vip', 'La tarifa mas completa del gimnasio. Podras asistir a cualquier actividad. ¿A qué esperas para probarlas todas?', 34.99);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `dni` varchar(10) NOT NULL,
  `password` varchar(25) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `apellido1` varchar(25) NOT NULL,
  `apellido2` varchar(25) DEFAULT NULL,
  `fecha_nac` date NOT NULL,
  `sexo` enum('hombre','mujer','') NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefono` int(9) NOT NULL,
  `cuenta_bancaria` varchar(24) NOT NULL,
  `ciudad` varchar(25) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `cod_postal` int(5) NOT NULL,
  `estado` enum('activo','baja','bloqueado') NOT NULL DEFAULT 'activo',
  `id_tarifa` int(11) DEFAULT NULL,
  `fecha_alta` date DEFAULT NULL,
  `fecha_baja` date DEFAULT NULL,
  `num_reservas` int(11) DEFAULT 0,
  `role` int(11) NOT NULL DEFAULT 2,
  `id_centro` int(11) DEFAULT NULL,
  `verificado` int(11) NOT NULL DEFAULT 0,
  `imagen` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`dni`, `password`, `nombre`, `apellido1`, `apellido2`, `fecha_nac`, `sexo`, `email`, `telefono`, `cuenta_bancaria`, `ciudad`, `direccion`, `cod_postal`, `estado`, `id_tarifa`, `fecha_alta`, `fecha_baja`, `num_reservas`, `role`, `id_centro`, `verificado`, `imagen`) VALUES
('31032580Z', '123456', 'a', 'a', '', '1999-12-22', 'hombre', 'c@asd.com', 678789789, 'ES1232132132132132132232', 'c', 'c', 0, 'baja', 3, NULL, '2021-06-10', 0, 2, 1, 1, 'fotoactual.jpg'),
('31032580Z', '123456', 'a', 'a', '', '2002-11-30', 'hombre', 'c@asd.comd', 678789789, 'ES1232132132132132132232', 'c', 'c', 0, 'baja', 2, NULL, '2021-05-22', 0, 2, 1, 0, NULL),
('31031480Z', '123456', 'Ronald', 'Koeman', '', '2002-08-01', 'hombre', 'c@h.com', 689543323, 'ES2312321321321321332323', 'Co', 'C', 124353544, 'activo', NULL, NULL, NULL, 0, 3, 1, 1, NULL),
('31032580Z', '123456', 'Herminio', 'Ludeña', 'Serna', '2002-12-18', 'hombre', 'c@h.comd', 678789878, 'ES3421342132132132323232', 'D', 'D', 0, 'activo', NULL, NULL, NULL, 0, 3, 1, 1, NULL),
('31031580Z', '123456', 'dasdsa', 'dsadsa', '', '2002-11-30', 'hombre', 'c@sds.com', 683279689, 'ES2134213214321321321321', 'Cordoba', '32', 33213, 'activo', 1, '2020-12-16', NULL, 0, 2, 2, 1, NULL),
('31031480Z', '123456', 'Rafael', 'Romero', 'Avila', '2002-12-17', 'hombre', 'ca@h.com', 689543323, 'ES2312321321321321332323', 'C', 'C', 12, 'activo', 1, '2021-04-13', NULL, 0, 2, 2, 1, NULL),
('31031580Z', '123456', 'dsds', 'sdsad', 'sdsa', '2002-11-30', 'hombre', 'cac@gd.com', 683279689, 'ES3131313131313131331313', 'Cordoba', 'C', 0, 'activo', 1, '2021-04-13', NULL, 0, 2, 2, 1, NULL),
('31032580Z', '123456', 'carlos', 'dsadsa', '', '1999-06-05', 'hombre', 'carlosaenas99@gmail.com', 678789876, 'ES3213323232323232323232', 'Cordoba', 'Pasaje Pintor Ruiz de Saravia nº5 4ºA', 14006, 'activo', 3, '2021-06-08', NULL, 0, 2, 1, 1, NULL),
('31032580Z', '123456', 'Carlos', 'Arenas', '', '1999-05-23', 'hombre', 'carlos_arenas_999@hotmail.com', 678789789, 'ES1232132132132132132232', 'c', 'c', 12, 'baja', 3, NULL, '2021-05-05', 0, 2, 3, 1, NULL),
('31032580Z', '123456', 'carlos', 'arenas', 'carretero', '1999-05-01', 'hombre', 'carlos_arenas_99@hotmail.com', 657654545, 'ES3412341234123134332432', 'cordoba', 'cordoba', 14007, 'activo', NULL, NULL, NULL, 0, 1, NULL, 1, 'fotoactual.jpg'),
('31032580Z', '123456', 'a', 'a', '', '2002-12-19', 'hombre', 'carlos_arenas_99@hotmail.coms', 678789789, 'ES1232132132132132132232', 'c', 'c', 0, 'activo', 1, '2021-01-10', NULL, 0, 2, 2, 0, NULL),
('31032580Z', '123456', 'a', 'a', '', '1999-12-22', 'hombre', 'cas@asd.com', 678789789, 'ES1232132132132132132232', 'c', 'c', 0, 'activo', 3, '2021-05-21', NULL, 0, 2, 2, 0, NULL),
('31032580Z', '123456', 'tomias', 'dsadsd', '', '1990-04-29', 'mujer', 'casas@g.com', 683279689, 'ES3432434343434343434343', 'Cordoba', 'Pasaje Pintor Ruiz de Saravia nº5 4ºA', 14006, 'activo', 1, '2021-05-18', NULL, 0, 2, 4, 1, NULL),
('31032580Z', '123456', 'a', 'a', '', '2021-05-14', 'hombre', 'cdsds@asd.com', 678789789, 'ES1232132132132132132232', 'c', 'c', 12, 'activo', 1, '2021-05-18', NULL, 0, 2, 3, 0, NULL),
('31032580Z', '123456', 'a', 'a', '', '1999-05-13', 'hombre', 'cewewfdffdf@asd.com', 678789789, 'ES1232132132132132132232', 'c', 'c', 12, 'activo', 2, '2021-05-19', NULL, 0, 2, 4, 0, NULL),
('31032580Z', '123456', 'a', 'a', '', '1999-05-29', 'mujer', 'csa@asd.com', 678789789, 'ES1232132132132132132232', 'c', 'c', 12, 'activo', 1, '2021-05-18', NULL, 0, 2, 2, 0, NULL),
('31032580Z', '123456', 'gerad', 'sada', 'adad', '1999-05-14', 'hombre', 'dasdsa@h.com', 683279689, 'ES2321321323232323232323', 'Cordoba', 'Pasaje Pintor Ruiz de Saravia nº5 4ºA', 14006, 'activo', 2, '2021-05-26', NULL, 0, 2, 1, 1, 'fotoactual.jpg'),
('31032580Z', '123456', 'dfd', 'fdfd', 'fd', '1969-06-05', 'hombre', 'dsaddas@hotmail.com', 683279689, 'ES3232323232323232323233', 'Cordoba', 'Pasaje Pintor Ruiz de Saravia nº5 4ºA', 14006, 'activo', 1, '2021-06-08', NULL, 0, 2, 1, 1, NULL),
('31031480Z', '123456', 'Pep', 'Guardiola', '', '2002-08-01', 'mujer', 'guardiola@hotmail.com', 689543323, 'ES2312321321321321332323', 'Co', 'C', 124353544, 'activo', NULL, NULL, NULL, 0, 3, 3, 1, NULL),
('31032580Z', '123456', 'Julian', 'Del Amo', '', '1999-05-13', 'hombre', 'julian@hotmail.com', 678678789, 'ES4343434343434343434343', 'Cordoba', 'Pasaje Pintor Ruiz de Saravia nº5 4ºA', 14006, 'baja', 1, NULL, '2021-06-12', 0, 2, 1, 1, NULL),
('31032580Z', '123456', 'leo', 'messi', '', '2002-12-25', 'mujer', 'leo@hotmail.com', 678787655, 'ES2321321323232323232323', 'C', 'C', 0, 'activo', 3, '2021-05-02', NULL, 0, 2, 2, 1, NULL),
('31311332H', '123456', 'Luis ', 'Enrique', '', '2002-12-30', 'hombre', 'luis@hotmail.com', 678787678, 'ES2321323213213232323232', 'DASDSA', 'DSADSA', 0, 'activo', NULL, NULL, NULL, 0, 3, 4, 1, 'luisenrique.jpg'),
('31032580H', '123456', 'Mari Luz', 'Sanchez', '', '1980-10-11', 'mujer', 'luz@hotmail.com', 683279689, 'ES2132132132323232323232', 'Cordoba', 'Avenida arroyo del moro', 14007, 'activo', NULL, NULL, NULL, 0, 3, 3, 1, NULL),
('32121321H', '123456', 'Maria ', 'Cabrera', 'Ortiz', '2002-10-01', 'mujer', 'maria@hotmail.com', 783279682, 'ES3213213232132323233233', 'Corda', 'Pasaje Pintor Ruiz de Saravia nº5 4ºA', 14006, 'activo', 1, '2021-05-26', NULL, 1, 2, 2, 1, 'maria.jpg'),
('31032580Z', '123456', 'jose', 'mourinho', '', '1990-06-24', 'hombre', 'mou@hotmail.com', 683279689, 'ES3213213213213213232323', 'Cordoba', 'Pasaje Pintor Ruiz de Saravia nº5 4ºA', 14006, 'activo', NULL, NULL, NULL, 0, 3, 4, 1, NULL),
('31032580Z', '123456', 'Ignacio', 'Rodriguez', '', '1999-05-13', 'hombre', 'nacho@hotmail.com', 678678789, 'ES4343434343434343434343', 'Cordoba', 'Pasaje Pintor Ruiz de Saravia nº5 4ºA', 14006, 'activo', 3, '2021-05-22', NULL, 0, 2, 4, 1, NULL),
('31311332H', '123456', 'Antonio', 'Calvo', '', '2002-12-30', 'mujer', 'zidana@hotmail.com', 678787678, 'ES2321323213213232323232', 'DASDSA', 'DSADSA', 0, 'activo', NULL, NULL, NULL, NULL, 3, 2, 1, NULL),
('31311332H', '123456', 'Zinedi', 'Zidane', '', '2002-12-30', 'hombre', 'zidane@hotmail.com', 678787678, 'ES2321323213213232323232', 'DASDSA', 'DSADSA', 0, 'activo', NULL, NULL, NULL, 0, 3, 2, 1, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_monitor2` (`email_monitor`),
  ADD KEY `fk_idtarifa` (`id_tarifa`),
  ADD KEY `fk_color` (`color`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `centros`
--
ALTER TABLE `centros`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `colores`
--
ALTER TABLE `colores`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_musculo` (`nombre_musculo`);

--
-- Indices de la tabla `musculosprincipales`
--
ALTER TABLE `musculosprincipales`
  ADD PRIMARY KEY (`nombre`);

--
-- Indices de la tabla `noticias`
--
ALTER TABLE `noticias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_monitor` (`email_usuario`),
  ADD KEY `fk_categoriass` (`id_categoria`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cliente` (`email_cliente`),
  ADD KEY `fk_sesion` (`id_sesion`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `salas`
--
ALTER TABLE `salas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sesiones`
--
ALTER TABLE `sesiones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sala` (`sala`),
  ADD KEY `actividades` (`title`);

--
-- Indices de la tabla `tarifas`
--
ALTER TABLE `tarifas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`email`),
  ADD KEY `fk_tarifa` (`id_tarifa`),
  ADD KEY `fk_rol` (`role`),
  ADD KEY `fk_centro` (`id_centro`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividades`
--
ALTER TABLE `actividades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `centros`
--
ALTER TABLE `centros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `noticias`
--
ALTER TABLE `noticias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `salas`
--
ALTER TABLE `salas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `sesiones`
--
ALTER TABLE `sesiones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `tarifas`
--
ALTER TABLE `tarifas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD CONSTRAINT `fk_color` FOREIGN KEY (`color`) REFERENCES `colores` (`codigo`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `fk_idtarifa` FOREIGN KEY (`id_tarifa`) REFERENCES `tarifas` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `fk_monitor2` FOREIGN KEY (`email_monitor`) REFERENCES `usuarios` (`email`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Filtros para la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  ADD CONSTRAINT `fk_musculo` FOREIGN KEY (`nombre_musculo`) REFERENCES `musculosprincipales` (`nombre`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Filtros para la tabla `noticias`
--
ALTER TABLE `noticias`
  ADD CONSTRAINT `fk_categoriass` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `fk_monitor` FOREIGN KEY (`email_usuario`) REFERENCES `usuarios` (`email`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `fk_cliente` FOREIGN KEY (`email_cliente`) REFERENCES `usuarios` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_sesion` FOREIGN KEY (`id_sesion`) REFERENCES `sesiones` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Filtros para la tabla `sesiones`
--
ALTER TABLE `sesiones`
  ADD CONSTRAINT `actividades` FOREIGN KEY (`title`) REFERENCES `actividades` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `sala` FOREIGN KEY (`sala`) REFERENCES `salas` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_centro` FOREIGN KEY (`id_centro`) REFERENCES `centros` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rol` FOREIGN KEY (`role`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `fk_tarifa` FOREIGN KEY (`id_tarifa`) REFERENCES `tarifas` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
