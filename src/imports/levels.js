"use strict";

/**
 * @see https://www.npmjs.com/package/@ideditor/country-coder#RegionFeatureProperties
 */
export const levels = [
  'world',
  'unitedNations', // United Nations
  'union', // European Union
  'subunion', // Outermost Regions of the EU, Overseas Countries and Territories of the EU
  'region', // Africa, Americas, Antarctica, Asia, Europe, Oceania
  'subregion', // Sub-Saharan Africa, North America, Micronesia, etc.
  'intermediateRegion', // Eastern Africa, South America, Channel Islands, etc.
  'sharedLandform', // Great Britain, Macaronesia, Mariana Islands, etc.
  'country', // Ethiopia, Brazil, United States, etc.
  'subcountryGroup', // British Overseas Territories, Crown Dependencies, etc.
  'territory', // Puerto Rico, Gurnsey, Hong Kong, etc.
  'subterritory', // Sark, Ascension Island, Diego Garcia, etc.
];