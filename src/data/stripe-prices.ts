/**
 * Maps treatment IDs to Stripe price IDs.
 * For treatments with sub-treatments, use subTreatmentPriceMap instead.
 */
export const treatmentPriceMap: Record<string, string> = {
  "drenagem-linfatica": "price_1TEZVnEF7gDchvKDuqcXcg3u",
  "pressoterapia": "price_1TEZWAEF7gDchvKD80ERgtR7",
  "manta-termica": "price_1TEZWiEF7gDchvKD9leqLQki",
  "detox-pes": "price_1TEZWrEF7gDchvKDUQMjq0lr",
  "just4you-corporal": "price_1TEZWxEF7gDchvKD5yBdsoaJ",
  "eletroestimulacao": "price_1TEZWyEF7gDchvKDQyiBB9qv",
  "pump-up": "price_1TEZWzEF7gDchvKD5PUWAXFA",
  "massagem-redutora": "price_1TEZX1EF7gDchvKD6Ue5CXWz",
  "body-shape-pen": "price_1TEZX2EF7gDchvKDTkM4dee6",
  "hifu-facial": "price_1TEZXWEF7gDchvKDO4KSUB2q",
  "pure-facial": "price_1TEZX6EF7gDchvKDwpO20LCC",
  "fios-seda": "price_1TEZX7EF7gDchvKDRE2zyLLu",
  "booster-dermapen": "price_1TEZXXEF7gDchvKDi4uoAFN4",
  "intradermoterapia": "price_1TEZXYEF7gDchvKDq97f7sEH",
  "preenchimento-labial": "price_1TEZX8EF7gDchvKDhbVW2gkR",
  "micropigmentacao-labial": "price_1TEZXAEF7gDchvKDPgtQa47g",
  "sobrancelhas-hibridas": "price_1TEZXBEF7gDchvKDCf80k8dX",
  "lash-brow-lamination": "price_1TEZXFEF7gDchvKD6qgblp9f",
  "extensao-pestanas": "price_1TEZXGEF7gDchvKD4UTCi1fy",
  "design-sobrancelhas": "price_1TEZXHEF7gDchvKDoBM4LpY8",
  "liberacao-muscular": "price_1TEZXJEF7gDchvKDi4vOFRHZ",
  "empina-bumbum": "price_1TEZXKEF7gDchvKDklB3ifgN",
  "perda-medidas": "price_1TEZXOEF7gDchvKDhA4eA8G8",
  "crescimento-capilar": "price_1TEZXfEF7gDchvKD6agnzkIc",
  "preenchimento-rugas": "price_1TEZXeEF7gDchvKDZu6zpH2c",
  "facial-intensivo": "price_1TErTjEF7gDchvKDh0ZVqmT2",
  "fisio-localizada": "price_1TErTkEF7gDchvKD9fsXpyy3",
  "fisio-modelado": "price_1TErTlEF7gDchvKDtF70ocOB",
};

/**
 * Maps treatment IDs → sub-treatment name → Stripe price ID.
 * Used for treatments that have multiple pricing options (zones, areas, etc.).
 */
export const subTreatmentPriceMap: Record<string, Record<string, string>> = {
  "depilacao-laser": {
    "Virilha Simples": "price_1TEd3cEF7gDchvKDJ8YPvjpP",
    "Axila": "price_1TEd3eEF7gDchvKDFj62A389",
    "Axila + Virilha + Buço": "price_1TEd3fEF7gDchvKDLuYRssZL",
    "Braços + Axila ou Virilha": "price_1TEd3fEF7gDchvKD5yv9xya5",
    "Meia Perna + Axila ou Virilha": "price_1TEd3hEF7gDchvKDjSymnw8x",
    "Corpo Completo (virilha simples)": "price_1TEd3iEF7gDchvKDcX4IPewA",
    "Corpo Completo (virilha completa)": "price_1TEd3jEF7gDchvKDgn5rH07z",
  },
  "hifu-corporal": {
    "Colo/Peito": "price_1TEd6JEF7gDchvKD3TPJgBhY",
    "Braços": "price_1TEd6KEF7gDchvKDXyiJTXUW",
    "Barriga": "price_1TEd6LEF7gDchvKDkzU2umY2",
    "Flancos": "price_1TEd6MEF7gDchvKD38J0ZMIp",
    "Barriga + Flancos": "price_1TEd6NEF7gDchvKDHdVpxyeg",
    "Costas": "price_1TEd6NEF7gDchvKDUVSleLGE",
    "Glúteos": "price_1TEd6OEF7gDchvKD2i19mtAA",
    "Joelhos": "price_1TEd6PEF7gDchvKDXLwMNJbS",
    "Coxas": "price_1TEd6QEF7gDchvKDf7HbM5e6",
    "Pernas Completas": "price_1TEd6REF7gDchvKDfAXD1jiS",
  },
  "intensivo-flacidez-gordura": {
    "Braços (HIFU + 3x RF)": "price_1TErTnEF7gDchvKDAn3qmx9H",
    "Barriga + Flancos (HIFU + 5x RF)": "price_1TErToEF7gDchvKDh1FZvPhI",
  },
  "eliminacao-pelos": {
    "Pacote 5 Sessões (corpo completo)": "price_1TErTpEF7gDchvKDsz8IvcW9",
    "Pacote 8 Sessões (corpo completo)": "price_1TErTpEF7gDchvKDydJ34FxM",
  },
};
