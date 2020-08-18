import React, { Fragment } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import useField from '../../files/use-field';
import useFieldArray from '../../files/use-field-array';
import FormStateManager from '../../files/form-state-manager';

const DummyInput = (props) => {
  const { input, meta } = useField(props);
  return <input {...input} />;
};

const CompositeDummyInput = ({ name, ...props }) => {
  const firstField = useField({ ...props, name: `${name}.first-field` });
  const secondField = useField({ ...props, name: `${name}.second-field` });
  return (
    <Fragment>
      <input {...firstField.input} />
      <input {...secondField.input} />
    </Fragment>
  );
};

const DummyArrayHookSpy = () => Fragment;

const DummyArray = ({ compositeField, ...props }) => {
  const hookValue = useFieldArray(props);
  const {
    fields: { map, value }
  } = hookValue;
  const Component = compositeField ? CompositeDummyInput : DummyInput;
  return (
    <Fragment>
      <DummyArrayHookSpy {...hookValue.fields} />
      {map((name) => (
        <Component key={name} name={name} />
      ))}
    </Fragment>
  );
};

describe('useFieldArray', () => {
  describe('basic API', () => {
    it('should render 2 simple array inputs', () => {
      const wrapper = mount(
        <FormStateManager>
          {() => (
            <Fragment>
              <DummyArray name="simple-array" initialValue={['one', 'two']} />
            </Fragment>
          )}
        </FormStateManager>
      );
      expect(wrapper.find('input')).toHaveLength(2);
      expect(
        wrapper
          .find('input')
          .at(0)
          .prop('name')
      ).toEqual('simple-array[0]');
      expect(
        wrapper
          .find('input')
          .at(1)
          .prop('name')
      ).toEqual('simple-array[1]');
      expect(wrapper.find(DummyArrayHookSpy).prop('value')).toEqual(['one', 'two']);
    });

    it('should render 2 composite inputs', () => {
      const wrapper = mount(
        <FormStateManager>
          {() => (
            <Fragment>
              <DummyArray
                name="composite-array"
                compositeField
                initialValue={[
                  { 'first-field': 'one-first', 'second-field': 'one-second' },
                  { 'first-field': 'two-first', 'second-field': 'two-second' }
                ]}
              />
            </Fragment>
          )}
        </FormStateManager>
      );
      expect(wrapper.find('input')).toHaveLength(4);
      expect(
        wrapper
          .find('input')
          .at(0)
          .prop('name')
      ).toEqual('composite-array[0].first-field');
      expect(
        wrapper
          .find('input')
          .at(1)
          .prop('name')
      ).toEqual('composite-array[0].second-field');
      expect(
        wrapper
          .find('input')
          .at(2)
          .prop('name')
      ).toEqual('composite-array[1].first-field');
      expect(
        wrapper
          .find('input')
          .at(3)
          .prop('name')
      ).toEqual('composite-array[1].second-field');
      expect(wrapper.find(DummyArrayHookSpy).prop('value')).toEqual([
        { 'first-field': 'one-first', 'second-field': 'one-second' },
        { 'first-field': 'two-first', 'second-field': 'two-second' }
      ]);
    });

    it('should pass correct field name as argument to fields.forEach function', () => {
      const wrapper = mount(
        <FormStateManager>
          {() => (
            <Fragment>
              <DummyArray
                name="name-array"
                compositeField
                initialValue={[
                  { 'first-field': 'one-first', 'second-field': 'one-second' },
                  { 'first-field': 'two-first', 'second-field': 'two-second' }
                ]}
              />
            </Fragment>
          )}
        </FormStateManager>
      );

      wrapper.find(DummyArrayHookSpy).prop('forEach')((name, index) => {
        expect(name).toEqual(`name-array[${index}]`);
      });
    });

    it('should use empty array if field array has no value', () => {
      const wrapper = mount(<FormStateManager>{() => <DummyArray name="empty-array" compositeField />}</FormStateManager>);
      expect(wrapper.find('input')).toHaveLength(0);
      expect(wrapper.find(DummyArrayHookSpy).prop('value')).toBeFalsy();
    });
  });

  describe('fieldArray api methods', () => {
    it('should push new field to the end of the field array with no value', () => {
      const wrapper = mount(<FormStateManager>{() => <DummyArray name="push-array" />}</FormStateManager>);
      expect(wrapper.find('input')).toHaveLength(0);
      expect(wrapper.find(DummyArrayHookSpy).prop('value')).toBeFalsy();
      act(() => {
        wrapper.find(DummyArrayHookSpy).prop('push')();
      });
      wrapper.update();
      expect(wrapper.find('input')).toHaveLength(1);
      expect(wrapper.find('input').prop('value')).toEqual('');
      expect(wrapper.find(DummyArrayHookSpy).prop('value')).toEqual([undefined]);
    });

    it('should push new field to the end of the field array with initial value', async () => {
      const wrapper = mount(<FormStateManager>{() => <DummyArray name="push-array" />}</FormStateManager>);
      expect(wrapper.find('input')).toHaveLength(0);
      expect(wrapper.find(DummyArrayHookSpy).prop('value')).toBeFalsy();
      await act(async () => {
        wrapper.find(DummyArrayHookSpy).prop('push')('new-value');
      });
      await act(async () => {
        wrapper.update();
      });
      expect(wrapper.find('input')).toHaveLength(1);
      expect(wrapper.find(DummyArrayHookSpy).prop('value')).toEqual(['new-value']);
      expect(wrapper.find('input').prop('value')).toEqual('new-value');
    });
  });
});
