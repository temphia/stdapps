export interface Block {
  name: string;
  type: string;
  data: Block[] | CardElement | ListElement | RichTextElement | GallaryElement
}

export interface Link {
  from: string;
  to: string;
  name: string;
}

export interface Board {
  name: string;
  info: string;
}

export interface DataSchema {
  boards: Board[];
  schema_version: number;
  plug_version: number;
}

// elements

export interface CardElement {
  body: string;
  background: string;
  tags: string[]
}

export interface ListElement {
  items: { done: boolean; body: string }[];
}

export interface RichTextElement {
  contents: string;
}

export interface GallaryElement {
  items: { src: string; caption: string }[];
}

