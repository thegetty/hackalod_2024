<template>
  <div class="p-object">
    <dd>
      <dl>
        <dt>title</dt>
        <dd>{{ title }}</dd>
        <dt>Accession Number</dt>
        <dd>{{ accessionNumber }}</dd>
        <dt>Stock Number</dt>
        <dd>{{ stockNumber }}</dd>
      </dl>
    </dd>
  </div>
</template>

<script>
import {
  getClassifiedAs,
  getAccessionNumbers,
  getPrimaryName,
} from "@thegetty/linkedart.js";
export default {
  name: "ObjectView",
  components: {},
  props: {
    lod: {
      type: Object,
      default(rawProps) {
        return {
          "@context": "https://linked.art/ns/v1/linked-art.json",
          _label: "St Christopher",
          classified_as: [
            {
              _label: "paintings (visual works)",
              classified_as: [
                {
                  _label: "object/work type (category)",
                  id: "http://vocab.getty.edu/aat/300435443",
                  type: "Type",
                },
              ],
              id: "http://vocab.getty.edu/aat/300033618",
              type: "Type",
            },
          ],
          current_location: {
            id: "https://data.getty.edu/provenance/e17fa9f7-4a26-38b3-8ab7-b37b1870d768",
            type: "Place",
          },
          current_owner: [
            {
              id: "https://data.getty.edu/provenance/e15f8392-715f-35bf-a493-5847183513ef",
            },
          ],
          dimension: [
            {
              classified_as: [
                {
                  id: "http://vocab.getty.edu/aat/300055642",
                },
              ],
              id: "https://data.getty.edu/provenance/f9160680-624c-39eb-932d-43fd7eee5a77/tile/ec73a5ed-3b4c-453d-b8ff-fd65de8f0d4e/node/ead2cab0-bacf-11ea-81b2-3af9d3b32b71",
              identified_by: [
                {
                  content: "21.75 inches",
                  id: "https://data.getty.edu/provenance/f9160680-624c-39eb-932d-43fd7eee5a77/tile/1818f4e1-3583-4687-993b-69862880e4bb/node/ead2c344-bacf-11ea-81b2-3af9d3b32b71",
                  type: "Name",
                },
              ],
              referred_to_by: [
                {
                  id: "https://data.getty.edu/provenance/37b053df-daad-3c70-b2a8-83d564444c75",
                },
              ],
              type: "Dimension",
              unit: "http://vocab.getty.edu/aat/300379100",
              value: 21.75,
            },
            {
              classified_as: [
                {
                  _label: "Unknown physical dimension",
                  id: "http://vocab.getty.edu/aat/300055642",
                  type: "Type",
                },
              ],
              id: "https://data.getty.edu/provenance/f9160680-624c-39eb-932d-43fd7eee5a77/tile/be5ea837-0607-428f-8106-73b71946271c/node/ead2cab0-bacf-11ea-81b2-3af9d3b32b71",
              identified_by: [
                {
                  content: "27.25 inches",
                  id: "https://data.getty.edu/provenance/f9160680-624c-39eb-932d-43fd7eee5a77/tile/029382cc-b863-410f-8737-0bdbff49b51e/node/ead2c344-bacf-11ea-81b2-3af9d3b32b71",
                  type: "Name",
                },
              ],
              referred_to_by: [
                {
                  id: "https://data.getty.edu/provenance/37b053df-daad-3c70-b2a8-83d564444c75",
                },
              ],
              type: "Dimension",
              unit: {
                _label: "inches",
                id: "http://vocab.getty.edu/aat/300379100",
                type: "MeasurementUnit",
              },
              value: 27.25,
            },
          ],
          id: "https://data.getty.edu/provenance/f9160680-624c-39eb-932d-43fd7eee5a77",
          identified_by: [
            {
              classified_as: [
                {
                  _label: "titles (general, names)",
                  id: "http://vocab.getty.edu/aat/300417193",
                  type: "Type",
                },
              ],
              content: "St Christopher",
              id: "https://data.getty.edu/provenance/f9160680-624c-39eb-932d-43fd7eee5a77/tile/3d547b43-31ae-4bc6-8d9e-50744e23b61c/node/10120250-bad0-11ea-81b2-3af9d3b32b71",
              referred_to_by: [
                {
                  id: "https://data.getty.edu/provenance/37b053df-daad-3c70-b2a8-83d564444c75",
                },
              ],
              type: "Name",
            },
            {
              assigned_by: [
                {
                  carried_out_by: [
                    {
                      id: "https://data.getty.edu/provenance/29246664-db2b-3f62-8ba6-5e82ad675c77",
                      type: "Group",
                    },
                  ],
                  id: "https://data.getty.edu/provenance/f9160680-624c-39eb-932d-43fd7eee5a77/tile/9d10a764-e095-4faa-b67e-ec82d0f7c961/node/f359364e-bae6-11ea-81b2-3af9d3b32b71",
                  type: "AttributeAssignment",
                },
              ],
              classified_as: [
                {
                  _label: "Object Stock Number",
                  id: "http://vocab.getty.edu/aat/300412177",
                  type: "Type",
                },
              ],
              content: "A4468",
              id: "https://data.getty.edu/provenance/f9160680-624c-39eb-932d-43fd7eee5a77/tile/85c233c5-9c14-4561-9a3f-e56fef92450a/node/e7cbda1e-bacf-11ea-81b2-3af9d3b32b71",
              type: "Identifier",
            },
            {
              assigned_by: [
                {
                  carried_out_by: [
                    {
                      id: "https://data.getty.edu/provenance/e15f8392-715f-35bf-a493-5847183513ef",
                    },
                  ],
                  id: "https://data.getty.edu/provenance/f9160680-624c-39eb-932d-43fd7eee5a77/tile/79f8bd0e-7209-44a3-adae-ab47c3b51ab8/node/f359364e-bae6-11ea-81b2-3af9d3b32b71",
                  type: "AttributeAssignment",
                },
              ],
              classified_as: [
                {
                  _label: "Accession Number",
                  id: "http://vocab.getty.edu/aat/300312355",
                  type: "Type",
                },
              ],
              content: "1961.47",
              id: "https://data.getty.edu/provenance/f9160680-624c-39eb-932d-43fd7eee5a77/tile/839c27cf-131c-4aff-92f3-7f67026aa112/node/e7cbda1e-bacf-11ea-81b2-3af9d3b32b71",
              type: "Identifier",
            },
          ],
          produced_by: {
            _label: "Production event for St Christopher",
            attributed_by: [
              {
                assigned: [
                  {
                    id: "https://data.getty.edu/provenance/b9df6834-15b2-3089-9843-64d0f55e63de",
                  },
                ],
                carried_out_by: [
                  {
                    id: "https://data.getty.edu/provenance/29246664-db2b-3f62-8ba6-5e82ad675c77",
                  },
                ],
                "crm:P177_assigned_property_of_type": {
                  _label: "carried_out_by",
                  id: "crm:P14_carried_out_by",
                  type: "Type",
                },
                id: "https://data.getty.edu/provenance/f9160680-624c-39eb-932d-43fd7eee5a77/tile/e3c45a4e-cd00-4268-b5d6-61f53afb7739/node/28cd69ee-c79e-11ea-ad1b-3af9d3b32b71",
                type: "AttributeAssignment",
                used_specific_object: [
                  {
                    id: "https://data.getty.edu/provenance/37b053df-daad-3c70-b2a8-83d564444c75",
                  },
                ],
              },
            ],
            id: "https://data.getty.edu/provenance/f9160680-624c-39eb-932d-43fd7eee5a77/tile/5cb42d2d-f4ce-4a69-b1ad-b14278a22acd/node/ee570cc8-bacf-11ea-81b2-3af9d3b32b71",
            part: {
              _label: "Production sub-event for MASSYS, QUENTIN",
              carried_out_by: [
                {
                  id: "https://data.getty.edu/provenance/b9df6834-15b2-3089-9843-64d0f55e63de",
                  type: "Person",
                },
              ],
              id: "https://data.getty.edu/provenance/f9160680-624c-39eb-932d-43fd7eee5a77/tile/3537c909-e0c3-43bf-87f7-80cb7ac93464/node/2b1ab0a6-bae9-11ea-81b2-3af9d3b32b71",
              type: "Production",
            },
            timespan: {
              id: "https://data.getty.edu/provenance/f9160680-624c-39eb-932d-43fd7eee5a77/tile/5cb42d2d-f4ce-4a69-b1ad-b14278a22acd/node/ee572550-bacf-11ea-81b2-3af9d3b32b71",
              type: "TimeSpan",
            },
            type: "Production",
          },
          referred_to_by: [
            {
              id: "https://data.getty.edu/provenance/37b053df-daad-3c70-b2a8-83d564444c75",
            },
          ],
          shows: [
            {
              id: "https://data.getty.edu/provenance/cedf7502-6032-3cc0-a6e8-67504ded05fe",
              type: "VisualItem",
            },
          ],
          type: "HumanMadeObject",
        };
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    title: function () {
      return getPrimaryName(this.lod, {
        requestedClassifications: "http://vocab.getty.edu/aat/300417193",
      });
    },
    accessionNumber: function () {
      return getAccessionNumbers(this.lod).join(", ");
    },
    stockNumber: function () {
      return getClassifiedAs(
        this.lod.identified_by,
        "http://vocab.getty.edu/aat/300412177"
      )?.at(0)?.content;
    },
  },
};
</script>
<style lang="scss">
@import "./index";
</style>
