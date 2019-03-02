import {
  useEffect,
} from 'react';

export default function useAsyncEffect(effect, inputs) {
  useEffect(() => { effect(); }, inputs);
}
