import type { DroidCategory, Variant } from './types'
import type { DroidEconomy } from './types'

// Parses an abbreviated in-game amount string (e.g. '950', '3.8k', '112.50m',
// '8.8b') into a plain number. Returns null for null/empty input.
const suffixMultipliers: Record<string, number> = {
  k: 1e3,
  m: 1e6,
  b: 1e9,
  t: 1e12,
}

export const parseAmount = (amount: string | null): number | null => {
  if (!amount) return null
  const match = amount.trim().match(/^([\d.]+)\s*([kmbt]?)$/i)
  if (!match) return null
  const [, digits, suffix] = match
  const multiplier = suffix ? suffixMultipliers[suffix.toLowerCase()] : 1
  return Number(digits) * multiplier
}

// Per-droid economy stats across every variant. `income` is per second.
// Iconic droids are event-locked and excluded here (see `iconicIncome`).
export const droidEconomy: DroidEconomy[] = [
  // Common
  {
    name: 'Mouse',
    base: { cost: '950', income: '2', value: '665' },
    gold: { cost: '3.8k', income: '4', value: '2.66k' },
    diamond: { cost: '7.6k', income: '8', value: '5.32k' },
    rainbow: { cost: '11.40k', income: '16', value: '7.98k' },
    beskar: { cost: '15.20k', income: '24', value: '10.64k' },
  },
  {
    name: 'PIT',
    base: { cost: '1.1k', income: '2', value: '770' },
    gold: { cost: '4.4k', income: '4', value: '3.08k' },
    diamond: { cost: '8.8k', income: '8', value: '6.16k' },
    rainbow: { cost: '13.20k', income: '16', value: '9.24k' },
    beskar: { cost: '17.60k', income: '24', value: '12.32k' },
  },
  {
    name: 'Gonk',
    base: { cost: '3k', income: '4', value: '2.10k' },
    gold: { cost: '12k', income: '8', value: '8.40k' },
    diamond: { cost: '24k', income: '16', value: '16.80k' },
    rainbow: { cost: '36k', income: '32', value: '25.20k' },
    beskar: { cost: '48k', income: '48', value: '33.60k' },
  },
  {
    name: 'CB',
    base: { cost: '2k', income: '3', value: '1.40k' },
    gold: { cost: '8k', income: '6', value: '5.60k' },
    diamond: { cost: '16k', income: '12', value: '11.20k' },
    rainbow: { cost: '24k', income: '24', value: '16.80k' },
    beskar: { cost: '32k', income: '36', value: '22.40k' },
  },
  {
    name: 'R3',
    base: { cost: '2k', income: '3', value: '1.40k' },
    gold: { cost: '8k', income: '6', value: '5.60k' },
    diamond: { cost: '16k', income: '12', value: '11.20k' },
    rainbow: { cost: '24k', income: '24', value: '16.80k' },
    beskar: { cost: '32k', income: '36', value: '22.40k' },
  },
  {
    name: 'R5',
    base: { cost: '2k', income: '3', value: '1.40k' },
    gold: { cost: '8k', income: '6', value: '5.60k' },
    diamond: { cost: '16k', income: '12', value: '11.20k' },
    rainbow: { cost: '24k', income: '24', value: '16.80k' },
    beskar: { cost: '32k', income: '36', value: '22.40k' },
  },
  {
    name: 'R8',
    base: { cost: '3k', income: '4', value: '2.10k' },
    gold: { cost: '12k', income: '8', value: '8.40k' },
    diamond: { cost: '24k', income: '16', value: '16.80k' },
    rainbow: { cost: '36k', income: '32', value: '25.20k' },
    beskar: { cost: '48k', income: '48', value: '33.60k' },
  },
  {
    name: 'Imperial Probe',
    base: { cost: '5k', income: '6', value: '3.50k' },
    gold: { cost: '20k', income: '12', value: '14.00k' },
    diamond: { cost: '40k', income: '24', value: '28.00k' },
    rainbow: { cost: '60k', income: '48', value: '42.00k' },
    beskar: { cost: '80k', income: '72', value: '56k' },
  },
  {
    name: 'B1 Battle',
    base: { cost: '4k', income: '5', value: '2.80k' },
    gold: { cost: '16k', income: '10', value: '11.20k' },
    diamond: { cost: '32k', income: '20', value: '22.40k' },
    rainbow: { cost: '48k', income: '40', value: '33.60k' },
    beskar: { cost: '64k', income: '60', value: '44.80k' },
  },
  {
    name: 'DRK-1 Probe',
    base: { cost: '3k', income: '3', value: '2.10k' },
    gold: { cost: '12k', income: '6', value: '8.40k' },
    diamond: { cost: '24k', income: '12', value: '16.80k' },
    rainbow: { cost: '36k', income: '24', value: '25.20k' },
    beskar: { cost: '48k', income: '36', value: '33.60k' },
  },
  {
    name: 'ID10',
    base: { cost: '4k', income: '4', value: '2.80k' },
    gold: { cost: '16k', income: '8', value: '11.20k' },
    diamond: { cost: '32k', income: '16', value: '22.40k' },
    rainbow: { cost: '48k', income: '32', value: '33.60k' },
    beskar: { cost: '64k', income: '48', value: '44.80k' },
  },

  // Rare
  {
    name: 'BDX Explorer',
    base: { cost: '25k', income: '15', value: '17.50k' },
    gold: { cost: '100k', income: '30', value: '70.00k' },
    diamond: { cost: '200k', income: '60', value: '140.00k' },
    rainbow: { cost: '300k', income: '120', value: '210k' },
    beskar: { cost: '400k', income: '180', value: '280k' },
  },
  {
    name: 'ARG',
    base: { cost: '88k', income: '42', value: '61.60k' },
    gold: { cost: '352k', income: '84', value: '246.40k' },
    diamond: { cost: '704k', income: '168', value: '492.80k' },
    rainbow: { cost: '1.06m', income: '336', value: '739.20k' },
    beskar: { cost: '1.41m', income: '504', value: '985.60k' },
  },
  {
    name: 'Senate Hovercam',
    base: { cost: '100k', income: '46', value: '70.00k' },
    gold: { cost: '400k', income: '92', value: '280.00k' },
    diamond: { cost: '800k', income: '184', value: '560.00k' },
    rainbow: { cost: '1.20m', income: '368', value: '840.00k' },
    beskar: { cost: '1.60m', income: '552', value: '1.12m' },
  },
  {
    name: 'BU-4D',
    base: { cost: '130k', income: '58', value: '91.00k' },
    gold: { cost: '520k', income: '116', value: '364.00k' },
    diamond: { cost: '1.04m', income: '232', value: '728.00k' },
    rainbow: { cost: '1.56m', income: '464', value: '1.10m' },
    beskar: { cost: '2.08m', income: '696', value: '1.45m' },
  },
  {
    name: 'BAL-Core',
    base: { cost: '43k', income: '23', value: '30.10k' },
    gold: { cost: '172k', income: '46', value: '120.40k' },
    diamond: { cost: '344k', income: '92', value: '240.80k' },
    rainbow: { cost: '516k', income: '184', value: '361.20k' },
    beskar: { cost: '688k', income: '276', value: '481.60k' },
  },
  {
    name: 'ROLL-R',
    base: { cost: '62k', income: '31', value: '43.40k' },
    gold: { cost: '248k', income: '62', value: '173.60k' },
    diamond: { cost: '496k', income: '124', value: '347.20k' },
    rainbow: { cost: '744k', income: '248', value: '520.80k' },
    beskar: { cost: '992k', income: '372', value: '694.40k' },
  },
  {
    name: '2BB',
    base: { cost: '30k', income: '17', value: '21.00k' },
    gold: { cost: '120k', income: '34', value: '84.00k' },
    diamond: { cost: '240k', income: '68', value: '168.00k' },
    rainbow: { cost: '360k', income: '136', value: '252.00k' },
    beskar: { cost: '480k', income: '204', value: '336k' },
  },
  {
    name: 'A-LT',
    base: { cost: '74k', income: '36', value: '51.80k' },
    gold: { cost: '296k', income: '72', value: '207.20k' },
    diamond: { cost: '592k', income: '144', value: '414.40k' },
    rainbow: { cost: '885k', income: '288', value: '621.60k' },
    beskar: { cost: '1.18m', income: '432', value: '828.80k' },
  },
  {
    name: 'R4',
    base: { cost: '110k', income: '50', value: '77.00k' },
    gold: { cost: '440k', income: '100', value: '308.00k' },
    diamond: { cost: '880k', income: '200', value: '616.00k' },
    rainbow: { cost: '1.32m', income: '400', value: '922.50k' },
    beskar: { cost: '1.76m', income: '600', value: '1.23m' },
  },
  {
    name: 'R9',
    base: { cost: '120k', income: '54', value: '84.00k' },
    gold: { cost: '480k', income: '108', value: '336.00k' },
    diamond: { cost: '960k', income: '216', value: '672.00k' },
    rainbow: { cost: '1.44m', income: '432', value: '1.00m' },
    beskar: { cost: '1.92m', income: '648', value: '1.34m' },
  },
  {
    name: 'B1 Security',
    base: { cost: '150k', income: '66', value: '105k' },
    gold: { cost: '600k', income: '132', value: '420.00k' },
    diamond: { cost: '1.20m', income: '264', value: '840.00k' },
    rainbow: { cost: '1.80m', income: '528', value: '1.26m' },
    beskar: { cost: '2.40m', income: '792', value: '1.68m' },
  },
  {
    name: 'NAV-EX',
    base: { cost: '36k', income: '18', value: '25.20k' },
    gold: { cost: '144k', income: '36', value: '100.80k' },
    diamond: { cost: '288k', income: '72', value: '201.60k' },
    rainbow: { cost: '432k', income: '144', value: '302.4k' },
    beskar: { cost: '576k', income: '216', value: '403.20k' },
  },
  {
    name: 'VECT-ARM',
    base: { cost: '52k', income: '27', value: '36.40k' },
    gold: { cost: '208k', income: '54', value: '145.60k' },
    diamond: { cost: '416k', income: '108', value: '291.20k' },
    rainbow: { cost: '624k', income: '216', value: '436.80k' },
    beskar: { cost: '832k', income: '324', value: '582.40k' },
  },
  {
    name: 'HOV-R',
    base: { cost: '140k', income: '62', value: '98.00k' },
    gold: { cost: '560k', income: '124', value: '392.00k' },
    diamond: { cost: '1.12m', income: '248', value: '784.00k' },
    rainbow: { cost: '1.68m', income: '496', value: '1.18m' },
    beskar: { cost: '2.24m', income: '774', value: '1.56m' },
  },

  // Epic
  {
    name: 'Groundmech',
    base: { cost: '900k', income: '120', value: '630.00k' },
    gold: { cost: '3.60m', income: '240', value: '2.52m' },
    diamond: { cost: '7.20m', income: '480', value: '5.04m' },
    rainbow: { cost: '10.80m', income: '960', value: '7.56m' },
    beskar: { cost: '112.50m', income: '4.08k', value: '78.75m' },
  },
  {
    name: 'LO',
    base: { cost: '2.10m', income: '240', value: '1.47m' },
    gold: { cost: '8.40m', income: '480', value: '5.88m' },
    diamond: { cost: '16.8m', income: '960', value: '11.76m' },
    rainbow: { cost: '25.20m', income: '1.92k', value: '17.64m' },
    beskar: { cost: '262.5m', income: '8.16k', value: '183.75m' },
  },
  {
    name: 'AMP Walker',
    base: { cost: '5.40m', income: '570', value: '3.78m' },
    gold: { cost: '21.60m', income: '1.14k', value: '15.12m' },
    diamond: { cost: '43.20m', income: '2.28k', value: '30.24m' },
    rainbow: { cost: '64.80m', income: '4.56k', value: '45.36m' },
    beskar: { cost: '675m', income: '19.38k', value: '472.50m' },
  },
  {
    name: 'SEN-TRI',
    base: { cost: '4.80m', income: '510', value: '3.36m' },
    gold: { cost: '19.20m', income: '1.02k', value: '13.44m' },
    diamond: { cost: '38.40m', income: '2.04k', value: '26.88m' },
    rainbow: { cost: '57.60m', income: '4.08k', value: '40.32m' },
    beskar: { cost: '600m', income: '17.34k', value: '420m' },
  },
  {
    name: 'OPTI-Pod',
    base: { cost: '3.60m', income: '390', value: '2.52m' },
    gold: { cost: '14.4m', income: '780', value: '10.08m' },
    diamond: { cost: '28.80m', income: '1.56k', value: '20.16m' },
    rainbow: { cost: '43.20m', income: '3.12k', value: '30.24m' },
    beskar: { cost: '450m', income: '13.26k', value: '315m' },
  },
  {
    name: 'BB',
    base: { cost: '1.20m', income: '150', value: '840.00k' },
    gold: { cost: '4.80m', income: '300', value: '3.36m' },
    diamond: { cost: '9.60m', income: '600', value: '6.72m' },
    rainbow: { cost: '14.40m', income: '1.20k', value: '10.08m' },
    beskar: { cost: '150m', income: '5.10k', value: '105m' },
  },
  {
    name: 'R2',
    base: { cost: '3.30m', income: '360', value: '2.31m' },
    gold: { cost: '13.20m', income: '720', value: '9.24m' },
    diamond: { cost: '26.40m', income: '1.44k', value: '18.48m' },
    rainbow: { cost: '39.60m', income: '2.88k', value: '27.72m' },
    beskar: { cost: '412.50m', income: '12.24k', value: '288.75m' },
  },
  {
    name: 'R6',
    base: { cost: '2.70m', income: '300', value: '1.89m' },
    gold: { cost: '10.80m', income: '600', value: '7.56m' },
    diamond: { cost: '21.60m', income: '1.20k', value: '15.12m' },
    rainbow: { cost: '32.40m', income: '2.40k', value: '22.68m' },
    beskar: { cost: '337.50m', income: '10.20k', value: '236.25m' },
  },
  {
    name: 'TRAK-R',
    base: { cost: '3.00m', income: '330', value: '2.10m' },
    gold: { cost: '12m', income: '660', value: '8.40m' },
    diamond: { cost: '24m', income: '1.32k', value: '16.80m' },
    rainbow: { cost: '36m', income: '2.64k', value: '25.20m' },
    beskar: { cost: '375m', income: '11.22k', value: '262.50m' },
  },
  {
    name: 'Orb-Walker',
    base: { cost: '1.50m', income: '180', value: '1.05m' },
    gold: { cost: '6m', income: '360', value: '4.20m' },
    diamond: { cost: '12m', income: '720', value: '8.40m' },
    rainbow: { cost: '18m', income: '1.44k', value: '12.60m' },
    beskar: { cost: '187.50m', income: '6.12k', value: '131.25m' },
  },
  {
    name: 'Gunrunner',
    base: { cost: '6.30m', income: '660', value: '4.41m' },
    gold: { cost: '25.20m', income: '1.32k', value: '17.64m' },
    diamond: { cost: '50.40m', income: '2.64k', value: '35.28m' },
    rainbow: { cost: '75.60m', income: '5.28k', value: '52.92m' },
    beskar: { cost: '787.50m', income: '22.44k', value: '551.25m' },
  },
  {
    name: 'UTIL-TEC',
    base: { cost: '1.80m', income: '210', value: '1.26m' },
    gold: { cost: '7.20m', income: '420', value: '5.04m' },
    diamond: { cost: '14.40m', income: '840', value: '10.08m' },
    rainbow: { cost: '21.60m', income: '1.68k', value: '15.12m' },
    beskar: { cost: '225m', income: '7.14k', value: '157.50m' },
  },
  {
    name: 'B1 Heavy',
    base: { cost: '6.00m', income: '630', value: '4.20m' },
    gold: { cost: '24m', income: '1.26k', value: '16.80m' },
    diamond: { cost: '48m', income: '2.52k', value: '33.60m' },
    rainbow: { cost: '72m', income: '5.04k', value: '50.40m' },
    beskar: { cost: '750m', income: '20.40k', value: '525.00m' },
  },
  {
    name: 'B2 Super',
    base: { cost: '3.90m', income: '420', value: '2.73m' },
    gold: { cost: '15.60m', income: '840', value: '10.92m' },
    diamond: { cost: '31.20m', income: '1.68k', value: '21.84m' },
    rainbow: { cost: '46.80m', income: '3.36k', value: '32.76m' },
    beskar: { cost: '487.50m', income: '14.28k', value: '341.25m' },
  },
  {
    name: 'B2 Heavy',
    base: { cost: '4.50m', income: '480', value: '3.15m' },
    gold: { cost: '18m', income: '960', value: '12.60m' },
    diamond: { cost: '36m', income: '1.92k', value: '25.20m' },
    rainbow: { cost: '54m', income: '3.84k', value: '37.80m' },
    beskar: { cost: '562.50m', income: '16.32k', value: '393.75m' },
  },
  {
    name: 'Strike-Orb',
    base: { cost: '5.10m', income: '540', value: '3.57m' },
    gold: { cost: '20.40m', income: '1.08k', value: '14.28m' },
    diamond: { cost: '40.80m', income: '2.16k', value: '28.56m' },
    rainbow: { cost: '61.20m', income: '4.32k', value: '42.84m' },
    beskar: { cost: '637.50m', income: '18.36k', value: '446.25m' },
  },
  {
    name: 'HAUL-R',
    base: { cost: '2.40m', income: '270', value: '1.68m' },
    gold: { cost: '9.60m', income: '540', value: '6.72m' },
    diamond: { cost: '19.20m', income: '1.08k', value: '13.44m' },
    rainbow: { cost: '28.80m', income: '2.16k', value: '20.16m' },
    beskar: { cost: '300m', income: '9.18k', value: '210.00m' },
  },
  {
    name: 'LNG-Shot',
    base: { cost: '4.20m', income: '450', value: '2.94m' },
    gold: { cost: '16.80m', income: '900', value: '11.76m' },
    diamond: { cost: '33.60m', income: '1.80k', value: '23.52m' },
    rainbow: { cost: '50.40m', income: '3.60k', value: '35.28m' },
    beskar: { cost: '525m', income: '15.30k', value: '367.50m' },
  },

  // Legendary
  {
    name: 'Proto-Roller',
    base: { cost: '22m', income: '972', value: '15.40m' },
    gold: { cost: '88m', income: '1.94k', value: '61.60m' },
    diamond: { cost: '176m', income: '3.89k', value: '123.20m' },
    rainbow: { cost: '264m', income: '7.78k', value: '184.80m' },
    beskar: { cost: '8.8b', income: '23.33k', value: '6.16b' },
  },
  {
    name: 'Mecha-Droid',
    base: { cost: '29m', income: '1.24k', value: '20.30m' },
    gold: { cost: '116m', income: '2.49k', value: '81.20m' },
    diamond: { cost: '232m', income: '4.97k', value: '162.40m' },
    rainbow: { cost: '348m', income: '9.95k', value: '243.60m' },
    beskar: { cost: '11.60b', income: '29.86k', value: '8.12b' },
  },
  {
    name: 'Mono-Walker',
    base: { cost: '37m', income: '1.50k', value: '25.90m' },
    gold: { cost: '148m', income: '3.00k', value: '103.60m' },
    diamond: { cost: '296m', income: '6.00k', value: '207.20m' },
    rainbow: { cost: '444m', income: '12.00k', value: '310.80m' },
    beskar: { cost: '14.8b', income: '36.00k', value: '10.36b' },
  },
  {
    name: 'BB9',
    base: { cost: '28m', income: '1.30k', value: '19.60m' },
    gold: { cost: '112m', income: '2.60k', value: '78.40m' },
    diamond: { cost: '224m', income: '5.20k', value: '156.80m' },
    rainbow: { cost: '336m', income: '10.40k', value: '235.20m' },
    beskar: { cost: '11.20b', income: '31.20k', value: '7.84b' },
  },
  {
    name: 'R7',
    base: { cost: '37m', income: '1.50k', value: '25.90m' },
    gold: { cost: '148m', income: '3.00k', value: '103.60m' },
    diamond: { cost: '296m', income: '6.00k', value: '207.20m' },
    rainbow: { cost: '444m', income: '12.00k', value: '310.80m' },
    beskar: { cost: '14.80b', income: '36.00k', value: '10.36b' },
  },
  {
    name: 'B2-RP',
    base: { cost: '31m', income: '1.30k', value: '21.70m' },
    gold: { cost: '124m', income: '2.60k', value: '86.80m' },
    diamond: { cost: '248m', income: '5.21k', value: '173.60m' },
    rainbow: { cost: '372m', income: '10.43k', value: '260.40m' },
    beskar: { cost: '14.8b', income: '31.30k', value: '8.68b' },
  },
  {
    name: 'Cyclo-Grav',
    base: { cost: '30m', income: '1.26k', value: '21.00m' },
    gold: { cost: '120m', income: '2.52k', value: '84.00m' },
    diamond: { cost: '240m', income: '5.04k', value: '168.00m' },
    rainbow: { cost: '360m', income: '10.08k', value: '252.00m' },
    beskar: { cost: '12b', income: '30.24k', value: '8.40b' },
  },
  {
    name: 'OPTI-Strike',
    base: { cost: '37m', income: '1.50k', value: '25.90m' },
    gold: { cost: '148m', income: '3.00k', value: '103.60m' },
    diamond: { cost: '296m', income: '6.00k', value: '207.20m' },
    rainbow: { cost: '444m', income: '12.00k', value: '310.80m' },
    beskar: { cost: '14.8b', income: '36.00k', value: '10.36b' },
  },
]

// Iconic droids are event-locked, have a single (Base) variant, and generate a
// percentage of total income per second rather than a flat amount. CB-23 is not
// yet released.
export const iconicIncome: {
  name: string
  income: string | null
  perk: string | null
}[] = [
  { name: 'BB8', income: '15%', perk: 'Doubles all upgrade chips' },
  { name: 'Mister Bones', income: '15%', perk: 'Doubles player damage' },
  { name: 'IG-11 Marshal', income: '15%', perk: 'Grants a blueprint shield' },
  { name: 'DJ-R3X', income: '15%', perk: '2x world quest rewards' },
  { name: 'CB-23', income: null, perk: null }, // Coming soon
]

// Chip cost to upgrade a droid from one variant to the next, by rarity.
// Iconic droids cannot be upgraded.
export const upgradeCosts: Record<
  Exclude<DroidCategory, 'Iconic'>,
  {
    baseToGold: number
    goldToDiamond: number
    diamondToRainbow: number
    rainbowToBeskar: number
  }
> = {
  Common: {
    baseToGold: 5,
    goldToDiamond: 25,
    diamondToRainbow: 40,
    rainbowToBeskar: 80,
  },
  Rare: {
    baseToGold: 30,
    goldToDiamond: 50,
    diamondToRainbow: 100,
    rainbowToBeskar: 250,
  },
  Epic: {
    baseToGold: 120,
    goldToDiamond: 180,
    diamondToRainbow: 240,
    rainbowToBeskar: 5000,
  },
  Legendary: {
    baseToGold: 400,
    goldToDiamond: 1200,
    diamondToRainbow: 4000,
    rainbowToBeskar: 12000,
  },
}

// Chip value gained from selling a droid, by rarity and variant.
export const sellValues: Record<
  Exclude<DroidCategory, 'Iconic'>,
  { gold: number; diamond: number; rainbow: number; beskar: number }
> = {
  Common: { gold: 4, diamond: 7, rainbow: 10, beskar: 13 },
  Rare: { gold: 6, diamond: 9, rainbow: 12, beskar: 15 },
  Epic: { gold: 30, diamond: 33, rainbow: 36, beskar: 39 },
  Legendary: { gold: 84, diamond: 87, rainbow: 90, beskar: 93 },
}

// Odds of a freshly crafted droid spawning as "flawless", by variant.
// Stored as the denominator N, i.e. a 1-in-N chance.
export const flawlessSpawnOdds: Record<Variant, number> = {
  Basic: 1000,
  Gold: 500,
  Diamond: 250,
  Rainbow: 125,
  Beskar: 100,
}
