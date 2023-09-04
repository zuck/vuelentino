<template>
  <div>
    <!-- @slot A test slot -->
    <slot name="test"></slot>
  </div>
</template>

<script>
/**
 * A test component
 * 
 * With a long description
 */
export default {
  name: "Test",

  props: {
    /**
     * A test prop
     */
    test: {
      type: String,
      default: "foo"
    },
  },

  emits: [
    /** A test event */
    'test'
  ],

  methods: {
    /**
     * A test method
     * 
     * @public
     * @param {(string|boolean)} foo A test arg
     * @param {string} bar Another test arg
     * @returns {string} A result
     */
    test (foo, bar) {
      return foo + bar
    }
  }
};
</script>
