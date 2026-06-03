/**
 * Represents a configuration field for data extraction.
 */
declare interface Field {
   /** Unique identifier for the field. */
   id: number
   /** Human-readable name of the field. */
   name: string
   /** CSS selector used to locate the data. */
   selector: string
}

/**
 * Extraction configuration defining how to locate rows and fields.
 */
declare interface Config {
   /** CSS selector for the rows in a list or table. */
   rowSelector: string
   /** List of fields to be extracted for each row. */
   fields: Field[]
}

/**
 * A mapped record of extracted data where keys are field names.
 */
declare type Table = Record<string, string>

/**
 * Selects the first element that matches the specified CSS selector.
 * @param selector CSS selector string.
 * @returns The matched element or null.
 */
declare function query(selector: string): Element | null

/**
 * Selects all elements that match the specified CSS selector.
 * @param selector CSS selector string.
 * @returns An array of matched elements.
 */
declare function queryAll(selector: string): Element[]

/**
 * Extracts and trims the text content from an element.
 * If a selector is provided, it finds the element relative to the root.
 * @param root The parent node to search within.
 * @param selector Optional CSS selector relative to the root.
 * @returns The trimmed text content or an empty string.
 */
declare function text(root: ParentNode, selector?: string): string

/**
 * Extracts the value of a specific attribute from an element.
 * If a selector is provided, it finds the element relative to the root.
 * @param root The parent node to search within.
 * @param selector Optional CSS selector relative to the root.
 * @param attribute The name of the attribute to retrieve.
 * @returns The attribute value or an empty string.
 */
declare function attr(root: ParentNode, selector: string | undefined, attribute: string): string

/**
 * Parses a string representing a price into a number by removing non-numeric characters.
 * @param value The price string to parse.
 * @returns The parsed number or null if parsing fails.
 */
declare function price(value: string): number | null

/**
 * Resolves a URL string to an absolute URL relative to a base URL.
 * @param baseUrl The base URL to resolve against.
 * @returns The resolved absolute URL string.
 */
declare function absoluteUrl(baseUrl: string): string

/**
 * Finds a field configuration by its name.
 */
declare var field: (name: string) => Field | undefined

/**
 * Finds a field configuration by its ID.
 */
declare var fieldById: (id: number) => Field | undefined
