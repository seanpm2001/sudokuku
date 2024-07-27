export const convert = puzzle => ([
    puzzle.slice(0,3),
    puzzle.slice(9,12),
    puzzle.slice(18,21),

    puzzle.slice(3,6),
    puzzle.slice(12,15),
    puzzle.slice(21,24),

    puzzle.slice(6,9),
    puzzle.slice(15,18),
    puzzle.slice(24,27),


    puzzle.slice(27,30),
    puzzle.slice(36,39),
    puzzle.slice(45,48),

    puzzle.slice(30,33),
    puzzle.slice(39,42),
    puzzle.slice(48,51),

    puzzle.slice(33,36),
    puzzle.slice(42,45),
    puzzle.slice(51,54),


    puzzle.slice(54,57),
    puzzle.slice(63,66),
    puzzle.slice(72,75),

    puzzle.slice(57,60),
    puzzle.slice(66,69),
    puzzle.slice(75,78),

    puzzle.slice(60,63),
    puzzle.slice(69,72),
    puzzle.slice(78,81)
  ]).join('').replaceAll('0','.')
