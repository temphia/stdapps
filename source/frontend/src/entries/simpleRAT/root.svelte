<script>
  import { createEventDispatcher } from "svelte";
  import Autotable from "../common/autotable/autotable.svelte";

  const devices = [
    {
      name: "device 1",
      id: "device-xyz",
      assoc_user: "super1",
      registered: "2022/04/23",
    },
  ];

  const dispatch = createEventDispatcher();
</script>

<Autotable
  action_key={"id"}
  datas={devices}
  actions={[
    {
      Name: "Explore",
      Action: (id) => {
        dispatch("open_shell", id);
      },
      Class: "bg-green-400",
      icon: "link",
    },
  ]}
  key_names={[
    ["Name", "name"],
    ["Id", "id"],
    ["assoc_user", "Assoc User"],
    ["registered", "Registered"],
  ]}
/>

