<script lang="ts">
  import { setContext } from "svelte";
  import type { Environment } from "../../lib";
  import RootLayout from "../common/root_layout.svelte";
  import Tailwind from "../common/tailwind.svelte";
  import Doc from "./doc.svelte";
  import Listings from "./listings.svelte";
  import { SimpleDocService } from "./service/service";
  import ModalCompo from "../common/modal.svelte";
  import type { Modal } from "../common/modal";
  import AddDoc from "./panels/add_doc.svelte";
  import { formatValue } from "../simpletasks/service";
  import { KEY } from "./service";
  import EditDoc from "./panels/edit_doc.svelte";

  export let env: Environment;

  let service: SimpleDocService;
  let loading = true;
  let selected;
  let modal: Modal;

  let docs = [];

  const load = async () => {
    loading = true;
    service = new SimpleDocService(env);
    if (!(await service.load())) {
      return;
    }

    const resp = await service.doc_api.list_docs();
    if (!resp.ok) {
      return;
    }

    docs = resp.data.map((v) => formatValue(v));
    loading = false;
  };

  const new_doc = () => {
    modal.show_small(AddDoc, {
      onSave: async (data: { slug: string; info: string; name: string }) => {
        loading = true;
        const resp = await service.doc_api.add_doc(data.slug, data);
        if (!resp.ok) {
          console.log("@err", resp);
          return;
        }
        modal.close_small();
        load();
      },
    });
  };

  setContext(KEY, {
    get_service: () => service,
    get_modal: () => modal,
  });

  load();
</script>

<ModalCompo bind:modal />

{#if loading}
  <div>Loading...</div>
{:else if selected}
  <Doc
    doc_meta={selected}
    goBack={() => {
      selected = null;
    }}
  />
{:else}
  <RootLayout name="Simpledoc" actions={{ "↻": load, "+": new_doc }}>
    <Listings
      {docs}
      onEdit={(_doc) => {
        modal.show_small(EditDoc, { ..._doc });
      }}
      onClick={(_doc) => {
        selected = _doc;
      }}
    />
  </RootLayout>
{/if}

<Tailwind />
