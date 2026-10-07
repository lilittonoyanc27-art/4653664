export interface TranslationItem {
  id: string;
  es: string;
  ru: string;
  note?: string;
}

export interface SerEstarRule {
  verb: 'SER' | 'ESTAR';
  ruleRu: string;
  examples: Array<{
    es: string;
    ru: string;
    usage: string;
  }>;
}

export interface ExerciseChoice {
  id: number;
  promptRu: string;
  templateEs: string;
  options: string[];
  correct: string;
  fullEs: string;
  explanation: string;
}

export interface MultipleChoiceItem {
  id: number;
  prompt: string;
  options: { key: string; text: string }[];
  correct: string;
  fullEs: string;
  ru: string;
  explanation?: string;
}

export interface ErrorItem {
  id: number;
  incorrectSentence: string;
  wrongWord: string;
  correctWord: string;
  correctSentence: string;
  ru: string;
  explanation: string;
}

export interface DialogueLine {
  id: number;
  speaker: 'Ana' | 'Pablo';
  es: string;
  ru: string;
}

// 1. Шпаргалка SER / ESTAR
export const SER_ESTAR_RULES: SerEstarRule[] = [
  {
    verb: 'SER',
    ruleRu: 'Используем для постоянных качеств, сути, происхождения, времени, профессий',
    examples: [
      { es: 'Soy estudiante.', ru: 'Я студент.', usage: 'Кто это (личность/статус)' },
      { es: 'Es profesor.', ru: 'Он преподаватель.', usage: 'Профессия' },
      { es: 'Ella es amable.', ru: 'Она добрая / вежливая.', usage: 'Постоянная характеристика' },
      { es: 'Somos de Armenia.', ru: 'Мы из Армении.', usage: 'Происхождение' },
      { es: 'Son las cinco.', ru: 'Сейчас пять часов.', usage: 'Время и дата' },
      { es: 'La mesa es de madera.', ru: 'Стол из дерева.', usage: 'Материал предмета' },
    ],
  },
  {
    verb: 'ESTAR',
    ruleRu: 'Используем для местоположения, временных состояний, эмоций, результатов действий',
    examples: [
      { es: 'Estoy en casa.', ru: 'Я дома.', usage: 'Местоположение' },
      { es: 'Estoy cansado.', ru: 'Я устал.', usage: 'Временное физическое состояние' },
      { es: 'Está contenta.', ru: 'Она довольна / радостная.', usage: 'Эмоция / настроение' },
      { es: 'La puerta está abierta.', ru: 'Дверь открыта.', usage: 'Результат действия / состояние предмета' },
    ],
  },
];

// 2. SER / ESTAR — 15 заданий
export const SER_ESTAR_EXERCISES: ExerciseChoice[] = [
  {
    id: 1,
    promptRu: 'Я дома.',
    templateEs: 'Yo ______ en casa.',
    options: ['estoy', 'soy', 'está', 'es'],
    correct: 'estoy',
    fullEs: 'Yo estoy en casa.',
    explanation: 'ESTAR — указывает на местонахождение (место: en casa).',
  },
  {
    id: 2,
    promptRu: 'Она врач.',
    templateEs: 'Ella ______ médica.',
    options: ['es', 'está', 'somos', 'son'],
    correct: 'es',
    fullEs: 'Ella es médica.',
    explanation: 'SER — профессии всегда идут с глаголом ser.',
  },
  {
    id: 3,
    promptRu: 'Мы устали.',
    templateEs: 'Nosotros ______ cansados.',
    options: ['estamos', 'somos', 'están', 'estoy'],
    correct: 'estamos',
    fullEs: 'Nosotros estamos cansados.',
    explanation: 'ESTAR — временное физическое состояние усталости.',
  },
  {
    id: 4,
    promptRu: 'Мадрид находится в Испании.',
    templateEs: 'Madrid ______ en España.',
    options: ['está', 'es', 'están', 'son'],
    correct: 'está',
    fullEs: 'Madrid está en España.',
    explanation: 'ESTAR — географическое расположение городов и объектов.',
  },
  {
    id: 5,
    promptRu: 'Они очень добрые.',
    templateEs: 'Ellos ______ muy amables.',
    options: ['son', 'están', 'somos', 'es'],
    correct: 'son',
    fullEs: 'Ellos son muy amables.',
    explanation: 'SER — черта характера, постоянное человеческое качество.',
  },
  {
    id: 6,
    promptRu: 'Сегодня понедельник.',
    templateEs: 'Hoy ______ lunes.',
    options: ['es', 'está', 'son', 'estamos'],
    correct: 'es',
    fullEs: 'Hoy es lunes.',
    explanation: 'SER — дни недели, дата и время (Hoy es...).',
  },
  {
    id: 7,
    promptRu: 'Кофе горячий.',
    templateEs: 'El café ______ caliente.',
    options: ['está', 'es', 'son', 'están'],
    correct: 'está',
    fullEs: 'El café está caliente.',
    explanation: 'ESTAR — текущее состояние температуры (остынет со временем).',
  },
  {
    id: 8,
    promptRu: 'Мой брат высокий.',
    templateEs: 'Mi hermano ______ alto.',
    options: ['es', 'está', 'somos', 'son'],
    correct: 'es',
    fullEs: 'Mi hermano es alto.',
    explanation: 'SER — физическая постоянная характеристика внешности.',
  },
  {
    id: 9,
    promptRu: 'Дверь закрыта.',
    templateEs: 'La puerta ______ cerrada.',
    options: ['está', 'es', 'están', 'son'],
    correct: 'está',
    fullEs: 'La puerta está cerrada.',
    explanation: 'ESTAR — состояние предмета в данный момент (результат действия).',
  },
  {
    id: 10,
    promptRu: 'Ты из Армении.',
    templateEs: 'Tú ______ de Armenia.',
    options: ['eres', 'estás', 'es', 'está'],
    correct: 'eres',
    fullEs: 'Tú eres de Armenia.',
    explanation: 'SER — происхождение, родина (ser de...).',
  },
  {
    id: 11,
    promptRu: 'Я сегодня очень счастлив.',
    templateEs: 'Hoy yo ______ muy feliz.',
    options: ['estoy', 'soy', 'está', 'es'],
    correct: 'estoy',
    fullEs: 'Hoy yo estoy muy feliz.',
    explanation: 'ESTAR — эмоция и состояние именно сегодня (Hoy estoy...).',
  },
  {
    id: 12,
    promptRu: 'Этот дом большой.',
    templateEs: 'Esta casa ______ grande.',
    options: ['es', 'está', 'somos', 'son'],
    correct: 'es',
    fullEs: 'Esta casa es grande.',
    explanation: 'SER — фундаментальный размер и характеристика строения.',
  },
  {
    id: 13,
    promptRu: 'Книга на столе.',
    templateEs: 'El libro ______ sobre la mesa.',
    options: ['está', 'es', 'están', 'son'],
    correct: 'está',
    fullEs: 'El libro está sobre la mesa.',
    explanation: 'ESTAR — расположение предмета в пространстве.',
  },
  {
    id: 14,
    promptRu: 'Сейчас мы в школе.',
    templateEs: 'Ahora nosotros ______ en la escuela.',
    options: ['estamos', 'somos', 'están', 'estoy'],
    correct: 'estamos',
    fullEs: 'Ahora nosotros estamos en la escuela.',
    explanation: 'ESTAR — нахождение людей в конкретном месте сейчас.',
  },
  {
    id: 15,
    promptRu: 'Моя мама очень спокойная по характеру.',
    templateEs: 'Mi madre ______ muy tranquila.',
    options: ['es', 'está', 'somos', 'son'],
    correct: 'es',
    fullEs: 'Mi madre es muy tranquila.',
    explanation: 'SER — черта характера (по характеру спокойная, а не временно).',
  },
];

// 3. Цвета — справочник (Включая подробные правила для жёлтого и оранжевого)
export const COLORS_GUIDE = {
  ruleChange: [
    { m: 'blanco', f: 'blanca', ru: 'белый / белая', hex: '#f8fafc', border: true },
    { m: 'negro', f: 'negra', ru: 'чёрный / чёрная', hex: '#0f172a' },
    { m: 'rojo', f: 'roja', ru: 'красный / красная', hex: '#ef4444' },
    { m: 'amarillo', f: 'amarilla', ru: 'жёлтый / жёлтая', hex: '#eab308' },
  ],
  yellowSpecialRule: {
    title: 'Жёлтый цвет (Amarillo / Amarilla)',
    explanation: 'Цвет amarillo оканчивается на -o, поэтому строго согласуется по роду и числу: мужской род — amarillo / amarillos, женский род — amarilla / amarillas.',
    examples: [
      { es: 'un limón amarillo', ru: 'жёлтый лимон (муж. род)' },
      { es: 'una camiseta amarilla', ru: 'жёлтая футболка (жен. род)' },
      { es: 'unos plátanos amarillos', ru: 'жёлтые бананы (муж. род, мн. ч.)' },
      { es: 'unas flores amarillas', ru: 'жёлтые цветы (жен. род, мн. ч.)' },
      { es: 'El vestido es amarillo.', ru: 'Платье жёлтое.' },
      { es: 'La chaqueta es amarilla.', ru: 'Куртка жёлтая.' },
    ],
  },
  orangeSpecialRule: {
    title: 'Оранжевый цвет (Naranja)',
    explanation: 'Слово naranja изначально означает плод («апельсин»). Как цвет оно НЕ меняется по родам (не существует формы «naranjo» для цвета!). В женском и мужском роде остаётся naranja. Во множественном числе может принимать -s: naranjas.',
    examples: [
      { es: 'un zumo naranja', ru: 'оранжевый сок (муж. род — naranja, НЕ naranjo!)' },
      { es: 'una camiseta naranja', ru: 'оранжевая футболка (жен. род — naranja)' },
      { es: 'un coche naranja', ru: 'оранжевая машина' },
      { es: 'unas mochilas naranjas', ru: 'оранжевые рюкзаки (мн. число)' },
      { es: 'unos zapatos naranja (или naranjas)', ru: 'оранжевые туфли' },
    ],
  },
  examplesChange: [
    { es: 'un coche rojo', ru: 'красная машина' },
    { es: 'una camiseta roja', ru: 'красная футболка' },
    { es: 'un vestido amarillo', ru: 'жёлтое платье' },
    { es: 'una falda amarilla', ru: 'жёлтая юбка' },
    { es: 'unos zapatos negros', ru: 'чёрные туфли' },
    { es: 'unas botas negras', ru: 'чёрные ботинки/сапоги' },
  ],
  ruleNoChangeGender: [
    { es: 'naranja', pl: 'naranjas', ru: 'оранжевый / оранжевые (НЕ меняется по родам!)', hex: '#f97316' },
    { es: 'azul', pl: 'azules', ru: 'синий / синие', hex: '#3b82f6' },
    { es: 'verde', pl: 'verdes', ru: 'зелёный / зелёные', hex: '#22c55e' },
    { es: 'gris', pl: 'grises', ru: 'серый / серые', hex: '#6b7280' },
    { es: 'marrón', pl: 'marrones', ru: 'коричневый / коричневые', hex: '#92400e' },
    { es: 'rosa', pl: 'rosas', ru: 'розовый / розовые', hex: '#ec4899' },
    { es: 'violeta', pl: 'violetas', ru: 'фиолетовый', hex: '#8b5cf6' },
    { es: 'beige', pl: 'beige', ru: 'бежевый', hex: '#d6d3d1' },
  ],
};

// 4. Цвета — выбери правильную форму (12 заданий, включая жёлтый и оранжевый)
export const COLORS_EXERCISES: MultipleChoiceItem[] = [
  {
    id: 1,
    prompt: 'una falda ______',
    options: [{ key: 'A', text: 'negro' }, { key: 'B', text: 'negra' }],
    correct: 'B',
    fullEs: 'una falda negra',
    ru: 'чёрная юбка',
    explanation: 'falda — женский род (una falda) → negra.',
  },
  {
    id: 2,
    prompt: 'un pantalón ______',
    options: [{ key: 'A', text: 'rojo' }, { key: 'B', text: 'roja' }],
    correct: 'A',
    fullEs: 'un pantalón rojo',
    ru: 'красные брюки (ед. ч. в испанском)',
    explanation: 'un pantalón — мужской род → rojo.',
  },
  {
    id: 3,
    prompt: 'una camiseta ______ (жёлтая)',
    options: [{ key: 'A', text: 'amarilla' }, { key: 'B', text: 'amarillo' }],
    correct: 'A',
    fullEs: 'una camiseta amarilla',
    ru: 'жёлтая футболка',
    explanation: 'camiseta — женский род (una camiseta) → окончание -a: amarilla!',
  },
  {
    id: 4,
    prompt: 'un coche ______ (оранжевый)',
    options: [{ key: 'A', text: 'naranja' }, { key: 'B', text: 'naranjo' }],
    correct: 'A',
    fullEs: 'un coche naranja',
    ru: 'оранжевая машина',
    explanation: 'naranja не имеет формы «naranjo» для цвета! И в мужском, и в женском роде — naranja.',
  },
  {
    id: 5,
    prompt: 'unas camisetas ______',
    options: [{ key: 'A', text: 'blancas' }, { key: 'B', text: 'blancos' }],
    correct: 'A',
    fullEs: 'unas camisetas blancas',
    ru: 'белые футболки',
    explanation: 'camisetas — женский род во множественном числе → blancas.',
  },
  {
    id: 6,
    prompt: 'unos zapatos ______',
    options: [{ key: 'A', text: 'negros' }, { key: 'B', text: 'negras' }],
    correct: 'A',
    fullEs: 'unos zapatos negros',
    ru: 'чёрные туфли',
    explanation: 'zapatos — мужской род во множественном числе → negros.',
  },
  {
    id: 7,
    prompt: 'un vestido ______ (жёлтое платье)',
    options: [{ key: 'A', text: 'amarillo' }, { key: 'B', text: 'amarilla' }],
    correct: 'A',
    fullEs: 'un vestido amarillo',
    ru: 'жёлтое платье',
    explanation: 'vestido — мужской род (un vestido) → окончание -o: amarillo.',
  },
  {
    id: 8,
    prompt: 'una camisa ______',
    options: [{ key: 'A', text: 'azul' }, { key: 'B', text: 'azula' }],
    correct: 'A',
    fullEs: 'una camisa azul',
    ru: 'синяя рубашка',
    explanation: 'azul оканчивается на согласный -l и одинаково для обоих родов (формы «azula» нет).',
  },
  {
    id: 9,
    prompt: 'unos pantalones ______',
    options: [{ key: 'A', text: 'verdes' }, { key: 'B', text: 'verdos' }],
    correct: 'A',
    fullEs: 'unos pantalones verdes',
    ru: 'зелёные брюки',
    explanation: 'verde не меняется по родам, а во множественном числе принимает -s → verdes.',
  },
  {
    id: 10,
    prompt: 'una mochila ______',
    options: [{ key: 'A', text: 'marrón' }, { key: 'B', text: 'marrona' }],
    correct: 'A',
    fullEs: 'una mochila marrón',
    ru: 'коричневый рюкзак',
    explanation: 'marrón одинаково для мужского и женского рода в единственном числе.',
  },
  {
    id: 11,
    prompt: 'unas botas ______',
    options: [{ key: 'A', text: 'grises' }, { key: 'B', text: 'grisas' }],
    correct: 'A',
    fullEs: 'unas botas grises',
    ru: 'серые сапоги',
    explanation: 'gris во множественном числе принимает -es: grises (формы «grisas» нет).',
  },
  {
    id: 12,
    prompt: 'una chaqueta ______',
    options: [{ key: 'A', text: 'roja' }, { key: 'B', text: 'rojo' }],
    correct: 'A',
    fullEs: 'una chaqueta roja',
    ru: 'красная куртка / жакет',
    explanation: 'chaqueta — женский род (una chaqueta) → roja.',
  },
];

// 5. Исключения и сложные случаи с цветами (10 заданий с оранжевым и жёлтым)
export const COLORS_EXCEPTIONS_EXERCISES: MultipleChoiceItem[] = [
  {
    id: 1,
    prompt: 'una camiseta ______ (оранжевая)',
    options: [{ key: 'A', text: 'naranja' }, { key: 'B', text: 'naranjo' }],
    correct: 'A',
    fullEs: 'una camiseta naranja',
    ru: 'оранжевая футболка',
    explanation: 'Цвет naranja происходит от названия апельсина и не имеет мужской формы «naranjo».',
  },
  {
    id: 2,
    prompt: 'un zumo ______ (оранжевый сок)',
    options: [{ key: 'A', text: 'naranja' }, { key: 'B', text: 'naranjo' }],
    correct: 'A',
    fullEs: 'un zumo naranja',
    ru: 'оранжевый сок',
    explanation: 'Даже с существительным мужского рода (un zumo) цвет остаётся naranja!',
  },
  {
    id: 3,
    prompt: 'unos pantalones ______',
    options: [{ key: 'A', text: 'marrones' }, { key: 'B', text: 'marróns' }],
    correct: 'A',
    fullEs: 'unos pantalones marrones',
    ru: 'коричневые брюки',
    explanation: 'Слова на согласный образуют мн. число через -es (marrón → marrones).',
  },
  {
    id: 4,
    prompt: 'una falda ______',
    options: [{ key: 'A', text: 'rosa' }, { key: 'B', text: 'roso' }],
    correct: 'A',
    fullEs: 'una falda rosa',
    ru: 'розовая юбка',
    explanation: 'rosa как цвет неизменяем по родам (не бывает «roso»).',
  },
  {
    id: 5,
    prompt: 'unos coches ______',
    options: [{ key: 'A', text: 'azules' }, { key: 'B', text: 'azuls' }],
    correct: 'A',
    fullEs: 'unos coches azules',
    ru: 'синие машины',
    explanation: 'azul оканчивается на согласную -l → во мн. числе прибавляется -es (azules).',
  },
  {
    id: 6,
    prompt: 'unas mochilas ______ (жёлтые рюкзаки)',
    options: [{ key: 'A', text: 'amarillas' }, { key: 'B', text: 'amarillos' }],
    correct: 'A',
    fullEs: 'unas mochilas amarillas',
    ru: 'жёлтые рюкзаки',
    explanation: 'mochilas — женский род множественного числа → amarillas.',
  },
  {
    id: 7,
    prompt: 'unas mochilas ______ (зелёные)',
    options: [{ key: 'A', text: 'verdes' }, { key: 'B', text: 'verdas' }],
    correct: 'A',
    fullEs: 'unas mochilas verdes',
    ru: 'зелёные рюкзаки',
    explanation: 'verde для обоих родов одинаково, во множественном числе -s → verdes.',
  },
  {
    id: 8,
    prompt: 'un abrigo ______',
    options: [{ key: 'A', text: 'gris' }, { key: 'B', text: 'griso' }],
    correct: 'A',
    fullEs: 'un abrigo gris',
    ru: 'серое пальто',
    explanation: 'gris не имеет окончания -o в мужском роде.',
  },
  {
    id: 9,
    prompt: 'unas chaquetas ______',
    options: [{ key: 'A', text: 'grises' }, { key: 'B', text: 'grisas' }],
    correct: 'A',
    fullEs: 'unas chaquetas grises',
    ru: 'серые куртки',
    explanation: 'Множественное число от gris — grises (для обоих родов).',
  },
  {
    id: 10,
    prompt: 'una camisa ______',
    options: [{ key: 'A', text: 'beige' }, { key: 'B', text: 'beiga' }],
    correct: 'A',
    fullEs: 'una camisa beige',
    ru: 'бежевая рубашка',
    explanation: 'Заимствованное слово beige остаётся неизменным по родам.',
  },
];

// 6 & 7. Прилагательные — Masculino / Femenino (10)
export const ADJECTIVES_FILL_EXERCISES: ExerciseChoice[] = [
  {
    id: 1,
    promptRu: 'Мария очень высокая.',
    templateEs: 'María es muy ______.',
    options: ['alta', 'alto', 'altas', 'altos'],
    correct: 'alta',
    fullEs: 'María es muy alta.',
    explanation: 'María — женский род: alto → alta.',
  },
  {
    id: 2,
    promptRu: 'Педро приятный / симпатичный.',
    templateEs: 'Pedro es ______.',
    options: ['simpático', 'simpática', 'simpáticos', 'simpáticas'],
    correct: 'simpático',
    fullEs: 'Pedro es simpático.',
    explanation: 'Pedro — мужской род: simpático.',
  },
  {
    id: 3,
    promptRu: 'Ана очень умная.',
    templateEs: 'Ana es muy ______.',
    options: ['inteligente', 'inteligenta', 'inteligento', 'inteligentes'],
    correct: 'inteligente',
    fullEs: 'Ana es muy inteligente.',
    explanation: 'Окончание на -e (inteligente) не меняется по родам!',
  },
  {
    id: 4,
    promptRu: 'Мой дом маленький.',
    templateEs: 'Mi casa es ______.',
    options: ['pequeña', 'pequeño', 'pequeñas', 'pequeños'],
    correct: 'pequeña',
    fullEs: 'Mi casa es pequeña.',
    explanation: 'casa — женский род: pequeño → pequeña.',
  },
  {
    id: 5,
    promptRu: 'Машина новая.',
    templateEs: 'El coche es ______.',
    options: ['nuevo', 'nueva', 'nuevos', 'nuevas'],
    correct: 'nuevo',
    fullEs: 'El coche es nuevo.',
    explanation: 'el coche — мужской род: nuevo.',
  },
  {
    id: 6,
    promptRu: 'Фильм интересный.',
    templateEs: 'La película es ______.',
    options: ['interesante', 'interesanta', 'interesanto', 'interesantes'],
    correct: 'interesante',
    fullEs: 'La película es interesante.',
    explanation: 'Окончание на -e (interesante) одинаково для обоих родов.',
  },
  {
    id: 7,
    promptRu: 'Карлос испанец.',
    templateEs: 'Carlos es ______.',
    options: ['español', 'española', 'españoles', 'españolas'],
    correct: 'español',
    fullEs: 'Carlos es español.',
    explanation: 'Мужской род национальности: español.',
  },
  {
    id: 8,
    promptRu: 'Лаура испанка.',
    templateEs: 'Laura es ______.',
    options: ['española', 'español', 'españolas', 'españoles'],
    correct: 'española',
    fullEs: 'Laura es española.',
    explanation: 'Национальности на согласный принимают -a в женском роде: español → española.',
  },
  {
    id: 9,
    promptRu: 'Моя учительница очень добрая / вежливая.',
    templateEs: 'Mi profesora es muy ______.',
    options: ['amable', 'amabla', 'amablo', 'amables'],
    correct: 'amable',
    fullEs: 'Mi profesora es muy amable.',
    explanation: 'amable оканчивается на -e и не изменяется по родам.',
  },
  {
    id: 10,
    promptRu: 'Экзамен трудный.',
    templateEs: 'El examen es ______.',
    options: ['difícil', 'difícila', 'difícilo', 'difíciles'],
    correct: 'difícil',
    fullEs: 'El examen es difícil.',
    explanation: 'difícil оканчивается на согласный и одинаково для обоих родов.',
  },
];

// 8. Согласуй прилагательное во множественном числе (8)
export const PLURAL_EXERCISES: ExerciseChoice[] = [
  {
    id: 1,
    promptRu: 'Высокие парни (мальчики)',
    templateEs: 'chicos ______ (alto)',
    options: ['altos', 'altas', 'alto', 'alta'],
    correct: 'altos',
    fullEs: 'chicos altos',
    explanation: 'chicos (м. р. мн. ч.) → altos.',
  },
  {
    id: 2,
    promptRu: 'Высокие девушки (девочки)',
    templateEs: 'chicas ______ (alto)',
    options: ['altas', 'altos', 'alta', 'alto'],
    correct: 'altas',
    fullEs: 'chicas altas',
    explanation: 'chicas (ж. р. мн. ч.) → altas.',
  },
  {
    id: 3,
    promptRu: 'Новые машины',
    templateEs: 'coches ______ (nuevo)',
    options: ['nuevos', 'nuevas', 'nuevo', 'nueva'],
    correct: 'nuevos',
    fullEs: 'coches новых',
    explanation: 'coches (м. р. мн. ч.) → nuevos.',
  },
  {
    id: 4,
    promptRu: 'Белые дома',
    templateEs: 'casas ______ (blanco)',
    options: ['blancas', 'blancos', 'blanca', 'blanco'],
    correct: 'blancas',
    fullEs: 'casas blancas',
    explanation: 'casas (ж. р. мн. ч.) → blancas.',
  },
  {
    id: 5,
    promptRu: 'Умные студенты',
    templateEs: 'estudiantes ______ (inteligente)',
    options: ['inteligentes', 'inteligente', 'inteligenta', 'inteligento'],
    correct: 'inteligentes',
    fullEs: 'estudiantes inteligentes',
    explanation: 'inteligente оканчивается на гласную -e → во мн. числе прибавляется -s: inteligentes.',
  },
  {
    id: 6,
    promptRu: 'Интересные книги',
    templateEs: 'libros ______ (interesante)',
    options: ['interesantes', 'interesante', 'interesantos', 'interesantas'],
    correct: 'interesantes',
    fullEs: 'libros interesantes',
    explanation: 'libros (мн. ч.) + interesante → interesantes.',
  },
  {
    id: 7,
    promptRu: 'Испанские женщины',
    templateEs: 'mujeres ______ (español)',
    options: ['españolas', 'españoles', 'española', 'español'],
    correct: 'españolas',
    fullEs: 'mujeres españolas',
    explanation: 'mujeres — ж. род мн. число → españolas.',
  },
  {
    id: 8,
    promptRu: 'Французские мужчины',
    templateEs: 'hombres ______ (francés)',
    options: ['franceses', 'francéses', 'francesas', 'francés'],
    correct: 'franceses',
    fullEs: 'hombres franceses',
    explanation: 'francés (согласный -s) во мн. числе: franceses (знак графического ударения снимается).',
  },
];

// 9. Найди ошибку (8)
export const ERROR_EXERCISES: ErrorItem[] = [
  {
    id: 1,
    incorrectSentence: 'La chica es alto.',
    wrongWord: 'alto',
    correctWord: 'alta',
    correctSentence: 'La chica es alta.',
    ru: 'Девушка высокая.',
    explanation: 'chica — женский род, поэтому должно быть alta, а не alto.',
  },
  {
    id: 2,
    incorrectSentence: 'Los coches son roja.',
    wrongWord: 'roja',
    correctWord: 'rojos',
    correctSentence: 'Los coches son rojos.',
    ru: 'Машины красные.',
    explanation: 'coches — мужской род во мн. числе, нужно согласовать: rojos.',
  },
  {
    id: 3,
    incorrectSentence: 'Ana lleva una camiseta azula.',
    wrongWord: 'azula',
    correctWord: 'azul',
    correctSentence: 'Ana lleva una camiseta azul.',
    ru: 'Ана одета в синюю футболку.',
    explanation: 'Слово azul не меняется по женскому роду, формы «azula» не существует.',
  },
  {
    id: 4,
    incorrectSentence: 'Las botas son negros.',
    wrongWord: 'negros',
    correctWord: 'negras',
    correctSentence: 'Las botas son negras.',
    ru: 'Сапоги чёрные.',
    explanation: 'botas — женский род во мн. числе (las botas) → negras.',
  },
  {
    id: 5,
    incorrectSentence: 'Mi hermana es español.',
    wrongWord: 'español',
    correctWord: 'española',
    correctSentence: 'Mi hermana es española.',
    ru: 'Моя сестра испанка.',
    explanation: 'Национальности на согласный в женском роде получают -a: española.',
  },
  {
    id: 6,
    incorrectSentence: 'Los estudiantes son inteligente.',
    wrongWord: 'inteligente',
    correctWord: 'inteligentes',
    correctSentence: 'Los estudiantes son inteligentes.',
    ru: 'Студенты умные.',
    explanation: 'estudiantes во множественном числе требует inteligentes.',
  },
  {
    id: 7,
    incorrectSentence: 'La casa es blanco.',
    wrongWord: 'blanco',
    correctWord: 'blanca',
    correctSentence: 'La casa es blanca.',
    ru: 'Дом белый.',
    explanation: 'casa — женский род (la casa) → blanca.',
  },
  {
    id: 8,
    incorrectSentence: 'Las películas son interesante.',
    wrongWord: 'interesante',
    correctWord: 'interesantes',
    correctSentence: 'Las películas son interesantes.',
    ru: 'Фильмы интересные.',
    explanation: 'películas во множественном числе → interesantes.',
  },
];

// 11. Разговорная практика-конструктор (Все этапы без армянского языка)
export const SPEAKING_PRACTICE = {
  warmup: [
    {
      qEs: '¿Dónde estás ahora?',
      qRu: 'Где ты сейчас?',
      hintEs: 'Estoy en...',
      exampleEs: 'Estoy en casa.',
      exampleRu: 'Я дома.',
      options: ['Estoy en casa.', 'Estoy en la escuela.', 'Estoy en el trabajo.', 'Estoy en la habitación.'],
    },
    {
      qEs: '¿Cómo estás hoy?',
      qRu: 'Как ты себя чувствуешь сегодня?',
      hintEs: 'Estoy + estado (cansado / contento / tranquilo / nervioso)',
      exampleEs: 'Estoy contento y tranquilo.',
      exampleRu: 'Я доволен и спокоен.',
      options: ['Estoy contento.', 'Estoy cansado.', 'Estoy muy bien.', 'Estoy un poco nervioso.'],
    },
    {
      qEs: '¿Cómo eres?',
      qRu: 'Какой ты по характеру / внешности?',
      hintEs: 'Soy + característica (tranquilo / amable / divertido / serio)',
      exampleEs: 'Soy amable y divertido.',
      exampleRu: 'Я добрый и весёлый.',
      options: ['Soy amable.', 'Soy tranquilo.', 'Soy deportista.', 'Soy alegre y trabajador.'],
    },
    {
      qEs: '¿De dónde eres?',
      qRu: 'Откуда ты?',
      hintEs: 'Soy de...',
      exampleEs: 'Soy de Madrid.',
      exampleRu: 'Я из Мадрида.',
      options: ['Soy de Madrid.', 'Soy de España.', 'Soy de Moscú.', 'Soy de Barcelona.'],
    },
    {
      qEs: '¿Dónde está tu mochila?',
      qRu: 'Где твой рюкзак?',
      hintEs: 'Mi mochila está...',
      exampleEs: 'Mi mochila está en la silla.',
      exampleRu: 'Мой рюкзак на стуле.',
      options: ['Mi mochila está en la silla.', 'Mi mochila está sobre la mesa.', 'Mi mochila está en el suelo.', 'Mi mochila está aquí.'],
    },
  ],

  builderSerEstar: [
    { words: 'Cristiano / portugués', sentence: 'Cristiano es portugués.', whyEs: 'SER → nacionalidad / origen', whyRu: 'Национальность / происхождение' },
    { words: 'Federico / cansado hoy', sentence: 'Federico está cansado hoy.', whyEs: 'ESTAR → estado temporal hoy', whyRu: 'Временное состояние сегодня' },
    { words: 'María / española', sentence: 'María es española.', whyEs: 'SER → nacionalidad', whyRu: 'Национальность' },
    { words: 'nosotros / en el estadio', sentence: 'Nosotros estamos en el estadio.', whyEs: 'ESTAR → lugar', whyRu: 'Местоположение' },
    { words: 'Pedro / alto', sentence: 'Pedro es alto.', whyEs: 'SER → característica física', whyRu: 'Физическая характеристика' },
    { words: 'la pelota / en el suelo', sentence: 'La pelota está en el suelo.', whyEs: 'ESTAR → lugar / posición', whyRu: 'Местоположение' },
    { words: 'los jugadores / nerviosos', sentence: 'Los jugadores están nerviosos.', whyEs: 'ESTAR → estado emocional', whyRu: 'Эмоциональное состояние' },
    { words: 'el entrenador / serio', sentence: 'El entrenador es serio.', whyEs: 'SER → rasgo de personalidad', whyRu: 'Черта характера' },
    { words: 'Ana / en casa', sentence: 'Ana está en casa.', whyEs: 'ESTAR → lugar', whyRu: 'Местоположение' },
    { words: 'Barcelona / en España', sentence: 'Barcelona está en España.', whyEs: 'ESTAR → ubicación geográfica', whyRu: 'Географическое положение' },
    { words: 'mis amigos / muy simpáticos', sentence: 'Mis amigos son muy simpáticos.', whyEs: 'SER → característica', whyRu: 'Постоянная характеристика' },
  ],

  twoSentences: [
    {
      name: 'Carlos',
      words: 'simpático / cansado',
      sentence1: 'Carlos es simpático.',
      sentence1Ru: 'Карлос приятный / симпатичный человек.',
      sentence2: 'Carlos está cansado.',
      sentence2Ru: 'Карлос устал.',
      summary: 'Es simpático, pero hoy está cansado.',
      summaryRu: 'Он приятный по характеру, но сегодня он устал.',
    },
    {
      name: '1. Marta',
      words: 'tranquila / nerviosa hoy',
      sentence1: 'Marta es tranquila.',
      sentence1Ru: 'Марта спокойная по характеру.',
      sentence2: 'Marta está nerviosa hoy.',
      sentence2Ru: 'Марта нервничает сегодня.',
      summary: 'Es tranquila, pero hoy está nerviosa.',
      summaryRu: 'Она спокойная, но сегодня нервничает.',
    },
    {
      name: '2. Pablo',
      words: 'alto / enfermo hoy',
      sentence1: 'Pablo es alto.',
      sentence1Ru: 'Пабло высокий.',
      sentence2: 'Pablo está enfermo hoy.',
      sentence2Ru: 'Пабло заболел сегодня.',
      summary: 'Es alto, pero hoy está enfermo.',
      summaryRu: 'Он высокий, но сегодня болеет.',
    },
    {
      name: '3. El entrenador',
      words: 'serio / enfadado ahora',
      sentence1: 'El entrenador es serio.',
      sentence1Ru: 'Тренер серьёзный.',
      sentence2: 'El entrenador está enfadado ahora.',
      sentence2Ru: 'Тренер зол прямо сейчас.',
      summary: 'Es serio, pero ahora está enfadado.',
      summaryRu: 'Он серьёзный человек, но сейчас зол.',
    },
    {
      name: '4. El jugador',
      words: 'rápido / cansado',
      sentence1: 'El jugador es rápido.',
      sentence1Ru: 'Игрок быстрый.',
      sentence2: 'El jugador está cansado.',
      sentence2Ru: 'Игрок устал.',
      summary: 'Es rápido, pero está cansado.',
      summaryRu: 'Он быстрый, но сейчас устал.',
    },
    {
      name: '5. Ana',
      words: 'alegre / preocupada hoy',
      sentence1: 'Ana es alegre.',
      sentence1Ru: 'Ана жизнерадостная.',
      sentence2: 'Ana está preocupada hoy.',
      sentence2Ru: 'Ана обеспокоена сегодня.',
      summary: 'Es alegre, pero hoy está preocupada.',
      summaryRu: 'Она весёлая по жизни, но сегодня встревожена.',
    },
  ],

  footballerGame: {
    hero: 'Cristiano Ronaldo ⚽',
    schema: [
      { verb: 'Es...', text: 'Es portugués. Es alto y atlético.', ru: 'Он португалец. Он высокий и атлетичный.' },
      { verb: 'Tiene...', text: 'Tiene ojos oscuros y pelo corto.', ru: 'У него тёмные глаза и короткие волосы.' },
      { verb: 'Lleva...', text: 'Lleva una camiseta blanca y pantalones cortos.', ru: 'Он носит белую футболку и шорты.' },
      { verb: 'Está...', text: 'Está contento y concentrado.', ru: 'Он доволен и сосредоточен.' },
    ],
    fullParagraph: 'Es rápido, fuerte y trabajador. Su camiseta es blanca. Está contento.',
    fullParagraphRu: 'Он быстрый, сильный и трудолюбивый. Его футболка белая. Он доволен.',
  },

  colorSentences: [
    { noun: 'vestido', color: 'amarillo', sentence: 'El vestido es amarillo.', ru: 'Платье жёлтое.' },
    { noun: 'falda', color: 'amarillo', sentence: 'La falda es amarilla.', ru: 'Юбка жёлтая.' },
    { noun: 'camiseta', color: 'naranja', sentence: 'La camiseta es naranja.', ru: 'Футболка оранжевая.' },
    { noun: 'coche', color: 'naranja', sentence: 'El coche es naranja.', ru: 'Машина оранжевая.' },
    { noun: 'falda', color: 'negro', sentence: 'La falda es negra.', ru: 'Юбка чёрная.' },
    { noun: 'coche', color: 'blanco', sentence: 'El coche es blanco.', ru: 'Машина белая.' },
    { noun: 'zapatos', color: 'rojo', sentence: 'Los zapatos son rojos.', ru: 'Туфли красные.' },
    { noun: 'camiseta', color: 'azul', sentence: 'La camiseta es azul.', ru: 'Футболка синяя.' },
    { noun: 'pantalones', color: 'verde', sentence: 'Los pantalones son verdes.', ru: 'Брюки зелёные.' },
    { noun: 'mochila', color: 'marrón', sentence: 'La mochila es marrón.', ru: 'Рюкзак коричневый.' },
    { noun: 'botas', color: 'gris', sentence: 'Las botas son grises.', ru: 'Сапоги серые.' },
  ],

  chooseAndSpeak: [
    { words: 'vestido — amarillo — bonito', sentence: 'El vestido es amarillo y bonito.', ru: 'Платье жёлтое и красивое.' },
    { words: 'camiseta — naranja — nuevo', sentence: 'La camiseta es naranja y nueva.', ru: 'Футболка оранжевая и новая.' },
    { words: 'casa — blanco — grande', sentence: 'La casa es blanca y grande.', ru: 'Дом белый и большой.' },
    { words: 'chica — alto — simpático', sentence: 'La chica es alta y simpática.', ru: 'Девушка высокая и приятная.' },
    { words: 'zapatos — negro — bonito', sentence: 'Los zapatos son negros и красивые.', ru: 'Туфли чёрные и красивые.' },
    { words: 'jugadores — joven — rápido', sentence: 'Los jugadores son jóvenes y rápidos.', ru: 'Игроки молодые и быстрые.' },
  ],

  shopDialog: [
    { speaker: 'Profesor', es: 'Hola. ¿Qué buscas?', ru: 'Привет. Что ты ищешь?' },
    { speaker: 'Alumno', es: 'Busco una camiseta.', ru: 'Я ищу футболку.' },
    { speaker: 'Profesor', es: '¿De qué color la quieres?', ru: 'Какого цвета ты её хочешь?' },
    { speaker: 'Alumno', es: 'La quiero amarilla o naranja.', ru: 'Я хочу её жёлтого или оранжевого цвета.' },
    { speaker: 'Profesor', es: '¿Grande o pequeña?', ru: 'Большую или маленькую?' },
    { speaker: 'Alumno', es: 'La quiero grande.', ru: 'Я хочу большую.' },
    { speaker: 'Profesor', es: 'Mira esta camiseta amarilla. ¿Cómo es?', ru: 'Посмотри на эту жёлтую футболку. Какая она?' },
    { speaker: 'Alumno', es: 'Es amarilla, grande y bonita.', ru: 'Она жёлтая, большая и красивая.' },
    { speaker: 'Profesor', es: '¿Dónde está la camiseta naranja?', ru: 'А где оранжевая футболка?' },
    { speaker: 'Alumno', es: 'Está sobre la mesa.', ru: 'Она лежит на столе.' },
  ],

  fourElements: [
    {
      elements: 'Carlos / estadio / cansado / simpático',
      sentences: ['Carlos está en el estadio.', 'Está cansado.', 'Es simpático.'],
      ru: 'Карлос на стадионе. Он устал. Он приятный/симпатичный.',
    },
    {
      elements: 'Ana / casa / contenta / inteligente',
      sentences: ['Ana está en casa.', 'Está contenta.', 'Es inteligente.'],
      ru: 'Ана дома. Она довольна. Она умная.',
    },
    {
      elements: 'Pedro / escuela / nervioso / alto',
      sentences: ['Pedro está en la escuela.', 'Está nervioso.', 'Es alto.'],
      ru: 'Педро в школе. Он нервничает. Он высокий.',
    },
    {
      elements: 'los jugadores / estadio / cansados / rápidos',
      sentences: ['Los jugadores están en el estadio.', 'Están cansados.', 'Son rápidos.'],
      ru: 'Игроки на стадионе. Они устали. Они быстрые.',
    },
    {
      elements: 'María / tienda / feliz / amable',
      sentences: ['María está en la tienda.', 'Está feliz.', 'Es amable.'],
      ru: 'Мария в магазине. Она счастлива. Она любезная/добрая.',
    },
    {
      elements: 'el entrenador / campo / enfadado / serio',
      sentences: ['El entrenador está en el campo.', 'Está enfadado.', 'Es serio.'],
      ru: 'Тренер на поле. Он сердит. Он серьёзный.',
    },
  ],

  final30SecTemplate: {
    title: '30-секундный рассказ о человеке (без остановки)',
    exampleEs: 'Mi amigo es alto y simpático. Es deportista. Hoy está contento. Lleva una camiseta amarilla y unos pantalones naranjas. Sus zapatos son blancos. Está en el campo de fútbol.',
    exampleRu: 'Мой друг высокий и приятный. Он спортсмен. Сегодня он доволен. На нём жёлтая футболка и оранжевые брюки. Его обувь белая. Он на футбольном поле.',
  },
};

// 12. Полный диалог Ana & Pablo (22 реплики с переводом на русский)
export const FULL_DIALOGUE: DialogueLine[] = [
  {
    id: 1,
    speaker: 'Ana',
    es: 'Hola, Pablo. ¿Cómo estás hoy?',
    ru: 'Привет, Пабло. Как ты сегодня?',
  },
  {
    id: 2,
    speaker: 'Pablo',
    es: 'Estoy bien, pero estoy un poco cansado.',
    ru: 'Я хорошо, но немного устал.',
  },
  {
    id: 3,
    speaker: 'Ana',
    es: '¿Por qué estás cansado?',
    ru: 'Почему ты устал?',
  },
  {
    id: 4,
    speaker: 'Pablo',
    es: 'Porque hoy estoy en la escuela desde muy temprano.',
    ru: 'Потому что сегодня я в школе с самого раннего утра.',
  },
  {
    id: 5,
    speaker: 'Ana',
    es: '¿Y cómo es tu escuela?',
    ru: 'А какая у тебя школа?',
  },
  {
    id: 6,
    speaker: 'Pablo',
    es: 'Es grande y moderna. Los profesores son amables.',
    ru: 'Она большая и современная. Учителя добрые.',
  },
  {
    id: 7,
    speaker: 'Ana',
    es: '¿Dónde está tu clase?',
    ru: 'Где находится твой класс?',
  },
  {
    id: 8,
    speaker: 'Pablo',
    es: 'Está en el segundo piso.',
    ru: 'Он находится на втором этаже.',
  },
  {
    id: 9,
    speaker: 'Ana',
    es: '¿Tu profesor de español es serio?',
    ru: 'Твой учитель испанского серьёзный?',
  },
  {
    id: 10,
    speaker: 'Pablo',
    es: 'Sí, es serio, pero también es muy simpático.',
    ru: 'Да, он серьёзный, но ещё и очень приятный.',
  },
  {
    id: 11,
    speaker: 'Ana',
    es: '¿Y hoy cómo está?',
    ru: 'А как он сегодня?',
  },
  {
    id: 12,
    speaker: 'Pablo',
    es: 'Hoy está contento porque todos los estudiantes están preparados.',
    ru: 'Сегодня он доволен, потому что все ученики готовы.',
  },
  {
    id: 13,
    speaker: 'Ana',
    es: '¿Tu mejor amigo también está en tu clase?',
    ru: 'Твой лучший друг тоже в твоём классе?',
  },
  {
    id: 14,
    speaker: 'Pablo',
    es: 'Sí. Se llama Carlos. Es alto, divertido y muy inteligente.',
    ru: 'Да. Его зовут Карлос. Он высокий, весёлый и очень умный.',
  },
  {
    id: 15,
    speaker: 'Ana',
    es: '¿Y dónde está Carlos ahora?',
    ru: 'А где сейчас Карлос?',
  },
  {
    id: 16,
    speaker: 'Pablo',
    es: 'Está en el patio con otros estudiantes.',
    ru: 'Он во дворе с другими учениками.',
  },
  {
    id: 17,
    speaker: 'Ana',
    es: '¿De dónde es Carlos?',
    ru: 'Откуда Карлос?',
  },
  {
    id: 18,
    speaker: 'Pablo',
    es: 'Es de Madrid, pero ahora está en Valencia con su familia.',
    ru: 'Он из Мадрида, но сейчас находится в Валенсии со своей семьёй.',
  },
  {
    id: 19,
    speaker: 'Ana',
    es: '¿Cómo está el tiempo hoy?',
    ru: 'Какая сегодня погода?',
  },
  {
    id: 20,
    speaker: 'Pablo',
    es: 'Está muy bueno. El cielo está azul y hace sol.',
    ru: 'Погода очень хорошая. Небо голубое и светит солнце.',
  },
  {
    id: 21,
    speaker: 'Ana',
    es: 'Perfecto. Entonces después de clase podéis ir al parque.',
    ru: 'Отлично. Тогда после уроков вы можете пойти в парк.',
  },
  {
    id: 22,
    speaker: 'Pablo',
    es: 'Sí. El parque está cerca de la escuela y es muy bonito.',
    ru: 'Да. Парк находится рядом со школой и он очень красивый.',
  },
];
