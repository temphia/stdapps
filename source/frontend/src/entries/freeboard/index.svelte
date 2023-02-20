<script lang="ts">
  import Tailwind from "../common/tailwind.svelte";
import Freeboard from "./freeboard.svelte";
  export let env: any;

  const blocks = [
    {
      name: "The Catalyzer",
      type: "card",
      data: {
        subtext: "CATEGORY-1",
        contents: `Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.`,
      },
    },
    {
      name: "my list",
      type: "todo",
      data: [],
    },
    {
      name: "Report",
      type: "richtext",
      data: `<p>Hello World! 🌍️ </p>`,
    },
    {
      name: "Header",
      type: "simpletext",
      data: "This is one",
    },
    {
      name: "gallary1",
      type: "gallery",
      data: [],
    },
    {
      name: "My Group 1",
      type: "group",
      data: [
        {
          name: "my list 2",
          type: "todo",
          data: [],
        },
        {
          name: "Header2",
          type: "simpletext",
          data: "This is two",
        },
      ],
    },
  ];

  const links = [
    {
      from: "my list",
      to: "Report",
      name: "refers",
    },
    {
      to: "The Catalyzer",
      from: "Header",
      name: "link3",
      weighted: true,
    },
  ];

  const boards = [
    {
      name: "test1",
      info: "this is test",
    },
    {
      name: "test2",
      info: "this is test 2",
    },
  ];
</script>

<Freeboard {blocks} {boards} {links} />

<Tailwind />
