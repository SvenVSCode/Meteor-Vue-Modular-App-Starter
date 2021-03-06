import { mount } from 'avoriaz';
import Counter from './Counter.vue';
import { setupVue } from '/src/imports/startup/client/client-index';
import timeout from 'timeout-as-promise';

describe('Counter', () => {
  let store;

  beforeEach(() => {
    store = setupVue().store;
  });

  it('renders without crashing', () => {
    const wrapper = mount(Counter, { store });
    expect(wrapper.find('.Counter').length).toEqual(1);
  });
  it('renders with count 0 initially', () => {
    const startValue = 0;
    const wrapper = mount(Counter, { store });
    expect(parseInt(wrapper.find('.count .value')[0].text())).toEqual(startValue);
  });
  describe('increment', () => {
    it('adds to count when Increment is clicked', () => {
      const startValue = 0;
      const changeValue = 2;
      const endValue = startValue + changeValue;
      store.state.counter.count = startValue;
      const wrapper = mount(Counter, { store });
      expect(parseInt(wrapper.find('.count .value')[0].text())).toEqual(startValue);
      const incrementInput = wrapper.find('.increment input')[0];
      incrementInput.element.value = changeValue;
      incrementInput.trigger('input');
      wrapper.find('.increment button')[0].trigger('click');
      expect(parseInt(wrapper.find('.count .value')[0].text())).toEqual(endValue);
    });
  });
  describe('decrement', () => {
    it('subtracts from count when Decrement is clicked', () => {
      const startValue = 0;
      const changeValue = 5;
      const endValue = startValue - changeValue;
      store.state.counter.count = startValue;
      const wrapper = mount(Counter, { store });
      expect(parseInt(wrapper.find('.count .value')[0].text())).toEqual(startValue);
      const decrementInput = wrapper.find('.decrement input')[0];
      decrementInput.element.value = changeValue;
      decrementInput.trigger('input');
      wrapper.find('.decrement button')[0].trigger('click');
      expect(parseInt(wrapper.find('.count .value')[0].text())).toEqual(endValue);
    });
  });
  describe('count plus ten', () => {
    it('displays count + 10 when incremented', () => {
      const startValue = 0;
      const changeValue = 5;
      const endValuePlusTen = startValue + changeValue + 10;
      store.state.counter.count = startValue;
      const wrapper = mount(Counter, { store });
      expect(parseInt(wrapper.find('.count .value')[0].text())).toEqual(startValue);
      const incrementInput = wrapper.find('.increment input')[0];
      incrementInput.element.value = changeValue;
      incrementInput.trigger('input');
      wrapper.find('.increment button')[0].trigger('click');
      expect(parseInt(wrapper.find('.count .value-plus-ten')[0].text())).toEqual(endValuePlusTen);
    });
    it('displays count + 10 when decremented', () => {
      const startValue = 0;
      const changeValue = 5;
      const endValuePlusTen = startValue - changeValue + 10;
      store.state.counter.count = startValue;
      const wrapper = mount(Counter, { store });
      expect(parseInt(wrapper.find('.count .value')[0].text())).toEqual(startValue);
      const decrementInput = wrapper.find('.decrement input')[0];
      decrementInput.element.value = changeValue;
      decrementInput.trigger('input');
      wrapper.find('.decrement button')[0].trigger('click');
      expect(parseInt(wrapper.find('.count .value-plus-ten')[0].text())).toEqual(endValuePlusTen);
    });
  });
  describe('reset delayed', () => {
    it('resets count back to 0 after a 1500ms delay', async () => {
      const startValue = 0;
      const changeValue = 2;
      const endValue = startValue + changeValue;
      store.state.counter.count = startValue;
      const wrapper = mount(Counter, { store });
      expect(parseInt(wrapper.find('.count .value')[0].text())).toEqual(startValue);
      const incrementInput = wrapper.find('.increment input')[0];
      incrementInput.element.value = changeValue;
      incrementInput.trigger('input');
      wrapper.find('.increment button')[0].trigger('click');
      expect(parseInt(wrapper.find('.count .value')[0].text())).toEqual(endValue);
      wrapper.find('.reset-delayed button')[0].trigger('click');
      await timeout(1500);
      expect(parseInt(wrapper.find('.count .value')[0].text())).toEqual(startValue);
    });
  });
});
