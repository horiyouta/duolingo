/**
 * [ type, question, text | karuta left, choices | karuta right ]
 * 
 * # type
 * 0: sort
 * 1: choice
 * 2: type
 * 3: karuta
 * 4: handwriting
 * 
 * # algorithm
 * 0: random
 * 1: step
 * 2: review
 */

// # Example
// [0, `Write this in Portuguese`, `I like bread`, [`eu`, `gosto`, `de`, `pão`]],
// [0, `Write this in Portuguese`, `You like milk`, [`vocé`, `gosta`, `de`, `leite`]],
// [0, `Write this in Portuguese`, `I want to run`, [`eu`, `quero`, `corro`]],
// [0, `Write this in English`, `Rato vai escola`, [`mouse`, `goes`, `to`, `school`]],
// [0, `Write this in English`, `É dois gatos`, [`it`, `is`, `two`, `cats`]],
// [0, `Write this in English`, `Lobo ama o cachorro`, [`wolf`, `loves`, `the`, `dog`]],
// [1, `Select the correct meaning`, `cat`, [`gato`, `cachorro`, `rato`]],
// [1, `Select the correct meaning`, `like`, [`gosto`, `prociso`, `quero`]],
// [1, `Select the correct meaning`, `he`, [`ele`, `ela`, `eles`]],
// [2, `Type this in Portuguese`, `I like bread`, [`Eu gosto de pão`]],
// [2, `Type this in Portuguese`, `You like milk`, [`Vocé gosta de leite`]],
// [2, `Type this in Portuguese`, `I want to run`, [`Eu quero corro`]],
// [3, `Select the matching pairs`, [`I`, `you`, `he`, `she`, `we`], [`eu`, `vocé`, `ele`, `ela`, `nós`]],
// [3, `Select the matching pairs`, [`cat`, `dog`, `mouse`, `wolf`, `milk`], [`gato`, `cachorro`, `rato`, `lobo`, `leite`]],
// [3, `Select the matching pairs`, [`like`, `go`, `is`, `love`, `want`], [`gosto`, `vou`, `é`, `amo`, `quero`]],
// [4, `Write this in Japanese`, `cachorro`, [`犬`]]

const data = [
    [
        [],
        [],
        [
            2,
            [4, `漢字を入力してください`, `[せん]たく`, [`濯`]],
            [4, `漢字を入力してください`, `おだ[やか]`, [`穏`]],
            [4, `漢字を入力してください`, `にわとり`, [`鶏`]],
            [4, `漢字を入力してください`, `つめ`, [`爪`]],
            [4, `漢字を入力してください`, `[かい]こん`, [`墾`]],
            [4, `漢字を入力してください`, `かん[とく]`, [`監`]],
            [4, `漢字を入力してください`, `[かん]とく`, [`督`]],
            [4, `漢字を入力してください`, `てい[おう]`, [`帝`]],
            [4, `漢字を入力してください`, `どろ`, [`泥`]],
            [4, `漢字を入力してください`, `ごう[まん]`, [`傲`]]
        ],
    ],
    [
        [],
        [],
        [
            2,
            [4, `漢字を入力してください`, `さが[す]`, [`捜`]],
            [4, `漢字を入力してください`, `じょう[だん]`, [`冗`]],
            [4, `漢字を入力してください`, `せい[めい]`, [`姓`]],
            [4, `漢字を入力してください`, `い[まわしい]`, [`忌`]],
            [4, `漢字を入力してください`, `しゅ[よう]`, [`腫`]],
            [4, `漢字を入力してください`, `[しゅ]よう`, [`瘍`]],
            [4, `漢字を入力してください`, `ほうむ[る]`, [`葬`]],
            [4, `漢字を入力してください`, `とく[めい]`, [`匿`]],
            [4, `漢字を入力してください`, `[せい]とん`, [`頓`]],
            [4, `漢字を入力してください`, `けもの`, [`獣`]],
        ]
    ],
    [
        [],
        [],
        [
            2,
            [4, `漢字を入力してください`, `[はん]ぷ`, [`頒`]],
            [4, `漢字を入力してください`, `そで`, [`袖`]],
            [4, `漢字を入力してください`, `ほり`, [`堀`]],
            [4, `漢字を入力してください`, `まくら`, [`枕`]],
            [4, `漢字を入力してください`, `かま`, [`釜`]],
            [4, `漢字を入力してください`, `わき`, [`脇`]],
            [4, `漢字を入力してください`, `むね`, [`棟`]],
            [4, `漢字を入力してください`, `わく`, [`枠`]],
            [4, `漢字を入力してください`, `[かい]きょう`, [`峡`]],
            [4, `漢字を入力してください`, `あい[いろ]`, [`藍`]],
        ]
    ],
    [
        [],
        [],
        [
            2,
            [4, `漢字を入力してください`, `せ[と]`, [`瀬`]],
            [4, `漢字を入力してください`, `にしき`, [`錦`]],
            [4, `漢字を入力してください`, `[じゅん]すい`, [`粋`]],
            [4, `漢字を入力してください`, `ひとみ`, [`瞳`]],
            [4, `漢字を入力してください`, `えっ[けん]`, [`謁`]],
            [4, `漢字を入力してください`, `まゆ`, [`繭`]],
            [4, `漢字を入力してください`, `じょう[ざい]`, [`錠`]],
            [4, `漢字を入力してください`, `わずら[う]`, [`患`]],
            [4, `漢字を入力してください`, `[い]ご`, [`碁`]],
        ]
    ],
    [
        [],
        [],
        [
            2,
            [4, `漢字を入力してください`, `おつ`, [`乙`]],
            [4, `漢字を入力してください`, `[や]きん`, [`冶`]],
            [4, `漢字を入力してください`, `りゅう[さん]`, [`硫`]],
            [4, `漢字を入力してください`, `[ほう]しゅう`, [`酬`]],
            [4, `漢字を入力してください`, `[れい]きゃく`, [`却`]],
            [4, `漢字を入力してください`, `[ざい]ばつ`, [`閥`]],
            [4, `漢字を入力してください`, `ばい[しょう]`, [`賠`]],
            [4, `漢字を入力してください`, `[かん]かつ`, [`轄`]],
            [4, `漢字を入力してください`, `[ふっ]とう`, [`騰`]],
        ]
    ],
    [
        [],
        [],
        [
            2,
            [4, `漢字を入力してください`, `ゆう[れい]`, [`幽`]],
            [4, `漢字を入力してください`, `たい[じ]`, [`胎`]],
            [4, `漢字を入力してください`, `しゃく[りょう]`, [`酌`]],
            [4, `漢字を入力してください`, `さ[た]`, [`沙`]],
            [4, `漢字を入力してください`, `[さ]た`, [`汰`]],
            [4, `漢字を入力してください`, `も[らす]`, [`漏`]],
            [4, `漢字を入力してください`, `みぞ`, [`溝`]],
            [4, `漢字を入力してください`, `こう[ずい]`, [`洪`]],
            [4, `漢字を入力してください`, `ひざ`, [`膝`]],
        ]
    ]
]