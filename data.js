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
        ]
    ]
]