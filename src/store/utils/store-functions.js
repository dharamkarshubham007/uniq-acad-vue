import { computed } from "vue";
import { useStore } from "vuex";

export function useState(arr) {
  const store = useStore();
  const keyPair = arr.map((s) => [s, computed(() => store.state[s])]);
  return Object.fromEntries(keyPair);
}

export function useGetters(arr) {
  const store = useStore();
  const keyPair = arr.map((g) => [g, computed(() => store.getters[g])]);
  return Object.fromEntries(keyPair);
}

export function useMutations(arr) {
  const store = useStore();
  const keyPair = arr.map((m) => [m, (input) => store.commit(m, input)]);
  return Object.fromEntries(keyPair);
}

export function useActions(arr) {
  const store = useStore();
  const keyPair = arr.map((a) => [a, (input) => store.dispatch(a, input)]);
  return Object.fromEntries(keyPair);
}
