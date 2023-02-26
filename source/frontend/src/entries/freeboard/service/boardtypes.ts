export interface Block {
  slug: string
  name: string;
  type: string;
  data: Block[] | CardElement | ListElement | RichTextElement | GallaryElement;
  links: { to: string; name: string }[];
  version?: number
}

export interface Link {
  from: string;
  to: string;
  name: string;
}

export interface Board {
  slug: string;
  name: string;
  info: string;
}

// elements

export interface CardElement {
  body: string;
  background: string;
  tags: string[];
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
