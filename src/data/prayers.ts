// Catálogo de oraciones para la página /oraciones.
// Datos estáticos bilingües (ES/EN). Lista plana, sin categorías.

export interface PrayerContent {
  title: string;
  body: string;
}

export interface Prayer {
  id: string;
  es: PrayerContent;
  en: PrayerContent;
}

export interface LocalizedPrayer {
  id: string;
  title: string;
  body: string;
}

export const prayers: Prayer[] = [
  {
    id: "ave-maria",
    es: {
      title: "Ave María",
      body: "Dios te salve, María, llena eres de gracia; el Señor es contigo. Bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús. Santa María, Madre de Dios, ruega por nosotros, pecadores, ahora y en la hora de nuestra muerte. Amén.",
    },
    en: {
      title: "Hail Mary",
      body: "Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.",
    },
  },
  {
    id: "padre-nuestro",
    es: {
      title: "Padre Nuestro",
      body: "Padre nuestro que estás en el cielo, santificado sea tu nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal. Amén.",
    },
    en: {
      title: "Our Father",
      body: "Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.",
    },
  },
  {
    id: "gloria-al-padre",
    es: {
      title: "Gloria al Padre",
      body: "Gloria al Padre y al Hijo y al Espíritu Santo. Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.",
    },
    en: {
      title: "Glory Be",
      body: "Glory be to the Father and to the Son and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.",
    },
  },
  {
    id: "acto-de-contricion",
    es: {
      title: "Acto de Contrición",
      body: "Dios mío, me arrepiento de todo corazón de todos mis pecados y los aborrezco, porque al pecar, no solo merezco las penas establecidas por ti justamente, sino principalmente porque te ofendí a ti, sumo Bien y digno de amor por encima de todas las cosas. Por eso propongo firmemente, con la ayuda de tu gracia, no pecar más en adelante y huir de toda ocasión de pecado. Amén.",
    },
    en: {
      title: "Act of Contrition",
      body: "O my God, I am heartily sorry for having offended Thee, and I detest all my sins because of Thy just punishments, but most of all because they offend Thee, my God, who art all-good and deserving of all my love. I firmly resolve, with the help of Thy grace, to sin no more and to avoid the near occasions of sin. Amen.",
    },
  },
  {
    id: "credo-de-los-apostoles",
    es: {
      title: "Credo de los Apóstoles",
      body: "Creo en Dios, Padre Todopoderoso, Creador del cielo y de la tierra. Creo en Jesucristo, su único Hijo, Nuestro Señor, que fue concebido por obra y gracia del Espíritu Santo, nació de Santa María Virgen, padeció bajo el poder de Poncio Pilato, fue crucificado, muerto y sepultado, descendió a los infiernos, al tercer día resucitó de entre los muertos, subió a los cielos y está sentado a la derecha de Dios, Padre todopoderoso. Desde allí ha de venir a juzgar a vivos y muertos. Creo en el Espíritu Santo, la santa Iglesia católica, la comunión de los santos, el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén.",
    },
    en: {
      title: "Apostles' Creed",
      body: "I believe in God, the Father Almighty, Creator of heaven and earth. And in Jesus Christ, His only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; He descended into hell; on the third day He rose again from the dead; He ascended into heaven, and is seated at the right hand of God the Father Almighty; from there He will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.",
    },
  },
  {
    id: "credo-niceno-constantinopolitano",
    es: {
      title: "Credo Niceno-Constantinopolitano",
      body: "Creo en un solo Dios, Padre todopoderoso, Creador del cielo y de la tierra, de todo lo visible y lo invisible. Creo en un solo Señor, Jesucristo, Hijo único de Dios, nacido del Padre antes de todos los siglos: Dios de Dios, Luz de Luz, Dios verdadero de Dios verdadero, engendrado, no creado, de la misma naturaleza del Padre, por quien todo fue hecho; que por nosotros, los hombres, y por nuestra salvación bajó del cielo, y por obra del Espíritu Santo se encarnó de María, la Virgen, y se hizo hombre; y por nuestra causa fue crucificado en tiempos de Poncio Pilato; padeció y fue sepultado, y resucitó al tercer día, según las Escrituras, y subió al cielo, y está sentado a la derecha del Padre; y de nuevo vendrá con gloria para juzgar a vivos y muertos, y su reino no tendrá fin. Creo en el Espíritu Santo, Señor y dador de vida, que procede del Padre y del Hijo, con el Padre y el Hijo recibe una misma adoración y gloria, y que habló por los profetas. Creo en la Iglesia, que es una, santa, católica y apostólica. Confieso que hay un solo bautismo para el perdón de los pecados. Espero la resurrección de los muertos y la vida del mundo futuro. Amén.",
    },
    en: {
      title: "Nicene Creed",
      body: "I believe in one God, the Father Almighty, Maker of heaven and earth, of all things visible and invisible. I believe in one Lord Jesus Christ, the Only Begotten Son of God, born of the Father before all ages. God from God, Light from Light, true God from true God, begotten, not made, consubstantial with the Father; through Him all things were made. For us men and for our salvation He came down from heaven, and by the Holy Spirit was incarnate of the Virgin Mary, and became man. For our sake He was crucified under Pontius Pilate, He suffered death and was buried, and rose again on the third day in accordance with the Scriptures. He ascended into heaven and is seated at the right hand of the Father. He will come again in glory to judge the living and the dead, and His kingdom will have no end. I believe in the Holy Spirit, the Lord, the giver of life, who proceeds from the Father and the Son, who with the Father and the Son is adored and glorified, who has spoken through the prophets. I believe in one, holy, catholic and apostolic Church. I confess one Baptism for the forgiveness of sins and I look forward to the resurrection of the dead and the life of the world to come. Amen.",
    },
  },
  {
    id: "comunion-espiritual",
    es: {
      title: "Comunión Espiritual",
      body: "A tus pies me postro, ¡oh, Jesús mío!, y te ofrezco el arrepentimiento de mi corazón contrito, que se hunde en la nada ante tu santa presencia. Te adoro en el Santísimo Sacramento de tu amor, la inefable Eucaristía, y deseo recibirte en la pobre morada que te ofrece mi alma. Esperando la dicha de la comunión sacramental, quiero poseerte ahora en espíritu. ¡Oh, mi buen Jesús!, ven a mí, puesto que yo vengo a ti, y que tu amor y tu gracia inflamen todo mi ser en la vida y en la muerte. Creo en ti, espero en ti y solamente a ti amo. Amén.",
    },
    en: {
      title: "Spiritual Communion",
      body: "At Thy feet, O my Jesus, I prostrate myself and I offer Thee the repentance of my contrite heart, which is humbled in its nothingness before Thy holy presence. I adore Thee in the Most Blessed Sacrament of Thy love, the ineffable Eucharist, and I desire to receive Thee into the poor dwelling that my soul offers Thee. While waiting for the happiness of sacramental communion, I wish to possess Thee now in spirit. O my good Jesus, come to me, since I am coming to Thee, and may Thy love and Thy grace inflame my whole being in life and in death. I believe in Thee, I hope in Thee, and Thee alone do I love. Amen.",
    },
  },
  {
    id: "ven-santo-espiritu",
    es: {
      title: "Ven, Santo Espíritu (Secuencia)",
      body: "Ven, Espíritu divino, manda tu luz desde el cielo. Padre amoroso del pobre; don, en tus dones espléndido; luz que penetra las almas; fuente del mayor consuelo. Ven, dulce huésped del alma, descanso de nuestro esfuerzo, tregua en el duro trabajo, brisa en las horas de fuego, gozo que enjuga las lágrimas y reconforta en los duelos. Entra hasta el fondo del alma, divina luz, y enriquécenos. Mira el vacío del hombre, si tú le faltas por dentro; mira el poder del pecado, cuando no envías tu aliento. Riega la tierra en sequía, sana el corazón enfermo, lava las manchas, infunde calor de vida en el hielo, doma el espíritu indómito, guía al que tuerce el sendero. Reparte tus siete dones, según la fe de tus siervos; por tu bondad y tu gracia, dale al esfuerzo su mérito; salva al que busca salvarse y danos tu gozo eterno. Amén.",
    },
    en: {
      title: "Come, Holy Spirit (Sequence)",
      body: "Come, Holy Spirit, send forth the heavenly radiance of your light. Come, father of the poor, come, giver of gifts, come, light of the heart. Greatest comforter, sweet guest of the soul, sweet refreshment. In labor, rest; in heat, tempering; in tears, solace. O most blessed light, fill the inmost heart of your faithful. Without your grace, there is nothing in man, nothing that is harmless. Wash what is unclean, water what is dry, heal what is wounded. Bend what is rigid, warm what is cold, guide what is astray. Give to your faithful, who trust in you, your sevenfold gifts. Give the merit of virtue, give the salvation of death, give eternal joy. Amen.",
    },
  },
  {
    id: "angelus",
    es: {
      title: "El Ángelus",
      body: "El ángel del Señor anunció a María. Y concibió por obra y gracia del Espíritu Santo. Dios te salve, María... He aquí la esclava del Señor. Hágase en mí según tu palabra. Dios te salve, María... Y el Verbo de Dios se hizo carne. Y habitó entre nosotros. Dios te salve, María... Ruega por nosotros, Santa Madre de Dios, para que seamos dignos de alcanzar las promesas de Jesucristo. Oremos: Oh Padre, infunde en nuestra alma tu gracia. Tú, que en la anunciación del ángel nos has revelado la encarnación de tu Hijo, por su pasión y su cruz condúcenos a la gloria de la resurrección. Por Cristo nuestro Señor. Amén.",
    },
    en: {
      title: "The Angelus",
      body: "The Angel of the Lord declared unto Mary. And she conceived of the Holy Spirit. Hail Mary... Behold the handmaid of the Lord. Be it done unto me according to thy word. Hail Mary... And the Word was made flesh. And dwelt among us. Hail Mary... Pray for us, O Holy Mother of God. That we may be made worthy of the promises of Christ. Let us pray: Pour forth, we beseech Thee, O Lord, Thy grace into our hearts; that we, to whom the Incarnation of Christ, Thy Son, was made known by the message of an Angel, may by His Passion and Cross be brought to the glory of His Resurrection. Through the same Christ our Lord. Amen.",
    },
  },
  {
    id: "santo-rosario",
    es: {
      title: "Santo Rosario (Misterios y Oración Final)",
      body: "Misterios gozosos (lunes y sábado): 1. La encarnación del Hijo de Dios. 2. La visitación de Nuestra Señora a su prima Santa Isabel. 3. El nacimiento del Hijo de Dios. 4. La presentación de Jesús en el templo. 5. El Niño Jesús perdido y hallado en el templo. Misterios luminosos (jueves): 1. El bautismo de Jesús en el Jordán. 2. La autorrevelación de Jesús en las bodas de Caná. 3. El anuncio del Reino de Dios invitando a la conversión. 4. La Transfiguración. 5. La institución de la Eucaristía. Misterios dolorosos (martes y viernes): 1. La oración de Jesús en el huerto. 2. La flagelación del Señor. 3. La coronación de espinas. 4. Jesús con la Cruz a cuestas camino del Calvario. 5. La crucifixión y muerte de Nuestro Señor. Misterios gloriosos (miércoles y domingo): 1. La resurrección del Hijo de Dios. 2. La ascensión del Señor a los cielos. 3. La venida del Espíritu Santo sobre los Apóstoles. 4. La asunción de Nuestra Señora a los cielos. 5. La coronación de la Santísima Virgen como Reina de cielos y tierra. Oración: Concede a tus fieles, Señor Dios nuestro, que gocen siempre de la salud del cuerpo y del alma. Por la gloriosa intercesión de María Santísima, siempre Virgen, sálvanos de los males que ahora nos afligen, y condúcenos a la alegría eterna. Por Cristo nuestro Señor. Amén.",
    },
    en: {
      title: "The Holy Rosary (Mysteries & Concluding Prayer)",
      body: "Joyful Mysteries (Monday & Saturday): 1. The Annunciation of the Lord. 2. The Visitation of Mary to Elizabeth. 3. The Nativity of our Lord. 4. The Presentation of Child Jesus in the Temple. 5. The Finding of Child Jesus in the Temple. Luminous Mysteries (Thursday): 1. The Baptism of Jesus in the Jordan. 2. The Wedding at Cana. 3. The Proclamation of the Kingdom of God. 4. The Transfiguration. 5. The Institution of the Eucharist. Sorrowful Mysteries (Tuesday & Friday): 1. The Agony in the Garden. 2. The Scourging at the Pillar. 3. The Crowning with Thorns. 4. The Carrying of the Cross. 5. The Crucifixion and Death of our Lord. Glorious Mysteries (Wednesday & Sunday): 1. The Resurrection of the Lord. 2. The Ascension of the Lord. 3. The Descent of the Holy Spirit. 4. The Assumption of Mary into Heaven. 5. The Coronation of Mary as Queen of Heaven and Earth. Concluding Prayer: Grant, O Lord God, we beseech Thee, that we Thy servants may enjoy continual health of body and soul; and by the glorious intercession of Blessed Mary, ever Virgin, be delivered from present sorrow, and behold the horizon of eternal joy. Through Christ our Lord. Amen.",
    },
  },
  {
    id: "magnificat",
    es: {
      title: "Magníficat",
      body: "Proclama mi alma la grandeza del Señor, se alegra mi espíritu en Dios, mi salvador; porque ha mirado la humillación de su esclava. Desde ahora me felicitarán todas las generaciones, porque el Poderoso ha hecho obras grandes por mí: su nombre es santo, y su misericordia llega a sus fieles de generación en generación. Él hace proezas con su brazo: dispersa a los soberbios de corazón, derriba del trono a los poderosos y enaltece a los humildes, a los hambrientos los colma de bienes y a los ricos los despide vacíos. Auxilia a Israel, su siervo, acordándose de la misericordia –como lo había prometido a nuestros padres– en favor de Abrahán y su descendencia por siempre. Gloria al Padre, y al Hijo, y al Espíritu Santo. Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.",
    },
    en: {
      title: "Magnificat",
      body: "My soul proclaims the greatness of the Lord, my spirit rejoices in God my Savior, for He has looked with favor on His lowly servant. From this day all generations will call me blessed: the Almighty has done great things for me, and holy is His Name. He has mercy on those who fear Him in every generation. He has shown the strength of His arm, He has scattered the proud in their conceit. He has cast down the mighty from their thrones, and has lifted up the lowly. He has filled the hungry with good things, and the rich He has sent away empty. He has come to the help of His servant Israel for He has remembered His promise of mercy, the promise He made to our fathers, to Abraham and his children forever. Glory be to the Father and to the Son and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.",
    },
  },
  {
    id: "salve-regina",
    es: {
      title: "Salve Regina",
      body: "Dios te salve, Reina y Madre de misericordia, vida, dulzura y esperanza nuestra; Dios te salve. A ti llamamos los desterrados hijos de Eva; a ti suspiramos, gimiendo y llorando en este valle de lágrimas. Ea, pues, Señora, abogada nuestra, vuelve a nosotros esos tus ojos misericordiosos; y después de este destierro, muéstranos a Jesús, fruto bendito de tu vientre. ¡Oh clementísima, oh piadosa, oh dulce Virgen María!",
    },
    en: {
      title: "Hail Holy Queen",
      body: "Hail, Holy Queen, Mother of Mercy, our life, our sweetness and our hope! To thee do we cry, poor banished children of Eve; to thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious Advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary!",
    },
  },
  {
    id: "san-miguel-arcangel",
    es: {
      title: "Oración a San Miguel Arcángel",
      body: "San Miguel Arcángel, defiéndenos en la lucha. Sé nuestro amparo contra la perversidad y acechanzas del demonio. Que Dios manifieste sobre él su poder, es nuestra humilde súplica. Y tú, oh Príncipe de la Milicia Celestial, con el poder que Dios te ha conferido, arroja al infierno a Satanás y a los demás espíritus malignos que vagan por el mundo para la perdición de las almas. Amén.",
    },
    en: {
      title: "Prayer to St. Michael the Archangel",
      body: "Saint Michael the Archangel, defend us in battle. Be our protection against the wickedness and snares of the devil. May God rebuke him, we humbly pray; and do thou, O Prince of the Heavenly Host, by the power of God, cast into hell Satan and all the evil spirits who prowl about the world seeking the ruin of souls. Amen.",
    },
  },
  {
    id: "consagracion-a-maria",
    es: {
      title: "Consagración a María",
      body: "Oh Señora y Madre mía, con filial cariño vengo a ofrecerte en este día cuanto soy y cuanto tengo: mis ojos para mirarte, mi voz para bendecirte, mi corazón para amarte y mi vida para servirte. Acepta, Madre, este don que te ofrece mi cariño; guárdame como un niño dentro de tu corazón. Que nunca sea traidor al amor que hoy se me entrega y que rechace sin pena los halagos de otro amor; y aunque el dolor me taladre y haga de mí un crucifijo, que yo sepa ser tu hijo y que sienta que eres mi Madre. En la dicha y en la aflicción, en mi vida y en mi agonía, mírame con compasión; no me dejes, Madre mía. Amén.",
    },
    en: {
      title: "Consecration to Mary",
      body: "O my Lady and my Mother, with filial love I come to offer you this day all that I am and all that I have: my eyes to look at you, my voice to bless you, my heart to love you, and my life to serve you. Accept, Mother, this gift offered by my affection; keep me like a child inside your heart. May I never be a traitor to the love given to me today, and may I reject without sorrow the allurements of another love. And even if pain pierces me and makes a crucifix of me, may I know how to be your child and feel that you are my Mother. In joy and in affliction, in my life and in my agony, look upon me with compassion; do not leave me, O Mother of mine. Amen.",
    },
  },
  {
    id: "consagracion-senor-de-los-milagros",
    es: {
      title: "Consagración al Señor de los Milagros",
      body: "Señor de los Milagros, porque te amo, he venido a visitarte para alabarte, bendecirte y darte gracias por tantos favores que me has concedido. Señor de los Milagros, porque te amo, me arrepiento de los pecados que he cometido. Te prometo comenzar desde hoy una vida nueva. Señor de los Milagros, porque te amo, quiero verte presente en mis hermanos. Señor de los Milagros, porque te amo, he venido a suplicarte como el leproso del Evangelio: 'Señor, si quieres, puedes curarme'. Perdona mis pecados y cura las enfermedades que me hacen sufrir. Señor de los Milagros, porque te amo, me consagro a tu servicio con mi familia, mis seres queridos, mis trabajos, estudios, problemas y alegrías. Señor de los Milagros, porque te amo, quiero vivir contigo durante la vida para vivir contigo en el cielo. Oh María, Madre del Perpetuo Socorro, presenta esta consagración a tu divino Hijo. Amén.",
    },
    en: {
      title: "Consecration to the Lord of Miracles",
      body: "Lord of Miracles, because I love You, I have come to visit You to praise You, bless You, and thank You for the many favors You have granted me. Lord of Miracles, because I love You, I repent of the sins I have committed. I promise You to begin a new life from this day forward. Lord of Miracles, because I love You, I want to see You present in my brothers and sisters. Lord of Miracles, because I love You, I have come to beg You like the leper in the Gospel: 'Lord, if You will, You can make me clean.' Forgive my sins and heal the illnesses that cause me to suffer. Lord of Miracles, because I love You, I consecrate myself to Your service along with my family, my loved ones, my work, studies, problems, and joys. Lord of Miracles, because I love You, I want to live with You during this life so that I may live with You in heaven. O Mary, Mother of Perpetual Help, present this consecration to Your divine Son. Amen.",
    },
  },
];

export function getPrayers(locale: string): LocalizedPrayer[] {
  const lang = locale === "en" ? "en" : "es";
  return prayers.map((p) => ({ id: p.id, title: p[lang].title, body: p[lang].body }));
}
