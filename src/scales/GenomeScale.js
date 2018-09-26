import { dispatch as d3_dispatch } from "d3-dispatch";

const DISPATCH_EVENT_UPDATE = "update";

export const CHROMOSOMES = [
    '1',
    '2', 
    '3', 
    '4', 
    '5', 
    '6', 
    '7', 
    '8', 
    '9', 
    '10', 
    '11', 
    '12', 
    '13', 
    '14', 
    '15', 
    '16', 
    '17', 
    '18', 
    '19', 
    '20', 
    '21', 
    '22', 
    'X', 
    'Y', 
    'M'
];

export const CHROMOSOME_LENGTHS = {
    '1': 249250621,
    '2': 243199373,
    '3': 198022430,
    '4': 191154276,
    '5': 180915260,
    '6': 171115067,
    '7': 159138663,
    '8': 146364022,
    '9': 141213431,
    '10': 135534747,
    '11': 135006516,
    '12': 133851895,
    '13': 115169878,
    '14': 107349540,
    '15': 102531392,
    '16': 90354753,
    '17': 81195210,
    '18': 78077248,
    '19': 59128983,
    '20': 63025520,
    '21': 48129895,
    '22': 51304566,
    'X': 155270560,
    'Y': 59373566,
    'M': 16571
};

export default class GenomeScale {

    /**
     * Create a genomic scale.
     * @param {*} id The ID for the scale.
     * @param {*} name The name for the scale.
     */
    constructor(id, name) {
        this._id = id;
        this._name = name;

        this._chromosomes = CHROMOSOMES;
        this._chromosomesFiltered = CHROMOSOMES.slice();

        this._domains = CHROMOSOMES.map((el) => [0, CHROMOSOME_LENGTHS[el]]);
        this._domainsFiltered = this._domains.slice();

        this._dispatch = d3_dispatch(DISPATCH_EVENT_UPDATE);
    }
    
    /**
     * @returns {string} The ID for the scale.
     */
    get id() {
        return this._id;
    }
    
    /**
     * @returns {string} The name for the scale.
     */
    get name() {
        return this._name;
    }

    /**
     * @param {string} chromosome A chromosome name.
     * @returns {array} Tuple-like array of inter-chromosome domain.
     */
    getDomain(chromosome) {
        return this._domains[this._chromosomes.findIndex(chromosome)];
    }

    /**
     * @returns {array} Array of tuple-like arrays of inter-chromosome domains.
     */
    getDomains() {
        return this._domains;
    }

    /**
     * @param {string} chromosome A chromosome name.
     * @returns {array} Tuple-like array of inter-chromosome domain filtered.
     */
    getDomainFiltered(chromosome) {
        return this._domainsFiltered[this._chromosomesFiltered.findIndex(chromosome)];
    }

    /**
     * @returns {array} Array of tuple-like arrays of inter-chromosome domains filtered.
     */
    getDomainsFiltered() {
        return this._domainsFiltered;
    }

    /**
     * @returns {array} Array of ratios corresponding to chromosome length over genome length.
     */
    getChromosomeRatios() {
        let cumsum = this._domains.reduce((a, h) => (a + (h[1] - h[0])), 0);
        return this._domains.map((el) => ((el[1] - el[0]) / cumsum));
    }

    /**
     * @returns {array} Array of ratios corresponding to chromosome length over genome length, for filtered chromosomes.
     */
    getChromosomeRatiosFiltered() {
        let cumsum = this._domainsFiltered.reduce((a, h) => (a + (h[1] - h[0])), 0);
        return this._domainsFiltered.map((el) => ((el[1] - el[0]) / cumsum));
    }
    

    /**
     * Convert a domain value to a human-readable value.
     * @param {string} chromosome A chromosome value.
     * @param {int} position A chromosome position value.
     * @returns {string} The corresponding humanDomain value.
     */
    toHuman(chromosome, position) {
        // TODO: number format for commas, etc...
        return "chr" + chromosome + ":" + position; 
    }

    /**
     * Subscribe to update events.
     * @param {string} componentId 
     * @param {function} callback 
     */
    onUpdate(componentId, callback) {
        this._dispatch.on(DISPATCH_EVENT_UPDATE + "." + componentId, callback);
    }

    /**
     * Emit the update event.
     */
    emitUpdate() {
        this._dispatch.call(DISPATCH_EVENT_UPDATE);
    }

   
}