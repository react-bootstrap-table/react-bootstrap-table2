import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Const from '../src/const';
import SortCaret from '../src/sort/caret';
import SortSymbol from '../src/sort/symbol';
import HeaderCell from '../src/header-cell';

describe('HeaderCell', () => {
  let wrapper;
  const index = 1;

  describe('simplest header cell', () => {
    const column = {
      dataField: 'id',
      text: 'ID'
    };

    beforeEach(() => {
      wrapper = shallow(<HeaderCell column={ column } index={ index } />);
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('th').length).toBe(1);
      expect(wrapper.text()).toEqual(column.text);
    });

    it('should not have default style', () => {
      const style = wrapper.find('th').prop('style');
      expect(style).toBeUndefined();
    });
  });

  describe('when column.headerTitle prop is defined', () => {
    let column;
    beforeEach(() => {
      column = {
        dataField: 'id',
        text: 'ID'
      };
    });

    describe('when headerTitle is boolean', () => {
      beforeEach(() => {
        column.headerTitle = true;
        wrapper = shallow(<HeaderCell column={ column } index={ index } />);
      });

      it('should render title as column.text as default', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('th').prop('title')).toBe(column.text);
      });
    });

    describe('when headerTitle is custom function', () => {
      const customTitle = 'test_title';
      let titleCallBack;

      beforeEach(() => {
        titleCallBack = sinon.stub()
          .withArgs(column)
          .returns(customTitle);
        column.headerTitle = titleCallBack;
        wrapper = shallow(<HeaderCell column={ column } index={ index } />);
      });

      it('should render title correctly by custom title function', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('th').prop('title')).toBe(customTitle);
      });

      it('should call custom title function correctly', () => {
        expect(titleCallBack.callCount).toBe(1);
        expect(titleCallBack.calledWith(column)).toBe(true);
      });
    });
  });

  describe('when column.headerAlign prop is defined', () => {
    let column;
    beforeEach(() => {
      column = {
        dataField: 'id',
        text: 'ID'
      };
    });

    describe('when headerAlign is string', () => {
      beforeEach(() => {
        column.headerAlign = 'center';
        wrapper = shallow(<HeaderCell column={ column } index={ index } />);
      });

      it('should render style.textAlign correctly', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('th').prop('style').textAlign).toBe(column.headerAlign);
      });
    });

    describe('when headerAlign is custom function', () => {
      const customAlign = 'center';
      let alignCallBack;

      beforeEach(() => {
        alignCallBack = sinon.stub()
          .withArgs(column, index)
          .returns(customAlign);
        column.headerAlign = alignCallBack;
        wrapper = shallow(<HeaderCell column={ column } index={ index } />);
      });

      it('should render style.textAlign correctly by custom headerAlign function', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('th').prop('style').textAlign).toBe(customAlign);
      });

      it('should call custom headerAlign function correctly', () => {
        expect(alignCallBack.callCount).toBe(1);
        expect(alignCallBack.calledWith(column, index)).toBe(true);
      });
    });
  });

  describe('when column.headerFormatter prop is defined', () => {
    const column = {
      dataField: 'id',
      text: 'ID'
    };
    const formatterResult = (<h3>{ column.text }</h3>);
    const formatter = sinon.stub()
      .withArgs(column, index)
      .returns(formatterResult);
    column.headerFormatter = formatter;

    beforeEach(() => {
      wrapper = shallow(<HeaderCell column={ column } index={ index } />);
    });

    afterEach(() => { formatter.reset(); });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.contains(formatterResult)).toBe(true);
    });

    it('should call custom headerFormatter correctly', () => {
      expect(formatter.callCount).toBe(1);
      expect(formatter.calledWith(
        column, index, { sortElement: undefined, filterElement: undefined })).toBe(true);
    });
  });

  describe('when column.headerEvents prop is defined', () => {
    let column;

    beforeEach(() => {
      column = {
        dataField: 'id',
        text: 'ID',
        headerEvents: {
          onClick: sinon.stub()
        }
      };

      wrapper = shallow(<HeaderCell column={ column } index={ index } />);
    });

    it('should attachs DOM event successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('th').prop('onClick')).toBeDefined();
    });

    it('event hook should be called when triggering', () => {
      wrapper.find('th').simulate('click');
      expect(column.headerEvents.onClick.callCount).toBe(1);
    });
  });

  describe('when column.headerStyle prop is defined', () => {
    let column;

    beforeEach(() => {
      column = {
        dataField: 'id',
        text: 'ID'
      };
    });

    describe('when headerStyle is an object', () => {
      beforeEach(() => {
        column.headerStyle = { backgroundColor: 'red' };
        wrapper = shallow(<HeaderCell column={ column } index={ index } />);
      });

      it('should render successfully', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('th').prop('style')).toEqual(column.headerStyle);
      });
    });

    describe('when headerStyle is a function', () => {
      const returnStyle = { backgroundColor: 'red' };
      let styleCallBack;

      beforeEach(() => {
        styleCallBack = sinon.stub()
          .withArgs(column, index)
          .returns(returnStyle);
        column.headerStyle = styleCallBack;
        wrapper = shallow(<HeaderCell column={ column } index={ index } />);
      });

      afterEach(() => { styleCallBack.reset(); });

      it('should render successfully', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('th').prop('style')).toEqual(returnStyle);
      });

      it('should call custom style function correctly', () => {
        expect(styleCallBack.callCount).toBe(1);
        expect(styleCallBack.calledWith(column, index)).toBe(true);
      });
    });
  });

  describe('when column.headerClasses prop is defined', () => {
    let column;

    beforeEach(() => {
      column = {
        dataField: 'id',
        text: 'ID'
      };
    });

    describe('when headerClasses is an object', () => {
      beforeEach(() => {
        column.headerClasses = 'td-test-class';
        wrapper = shallow(<HeaderCell column={ column } index={ index } />);
      });

      it('should render successfully', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.hasClass(column.headerClasses)).toBe(true);
      });
    });

    describe('when headerClasses is a function', () => {
      const returnClasses = 'td-test-class';
      let classesCallBack;

      beforeEach(() => {
        classesCallBack = sinon.stub()
          .withArgs(column, index)
          .returns(returnClasses);
        column.headerClasses = classesCallBack;
        wrapper = shallow(<HeaderCell column={ column } index={ index } />);
      });

      afterEach(() => { classesCallBack.reset(); });

      it('should render successfully', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.hasClass(returnClasses)).toBe(true);
      });

      it('should call custom classes function correctly', () => {
        expect(classesCallBack.callCount).toBe(1);
        expect(classesCallBack.calledWith(column, index)).toBe(true);
      });
    });

    describe('when column.headerAttrs prop is defined', () => {
      beforeEach(() => {
        column = {
          dataField: 'id',
          text: 'ID'
        };
      });

      describe('when headerAttrs is an object', () => {
        it('should render column.headerAttrs correctly', () => {
          column.headerAttrs = {
            'data-test': 'test',
            title: 'title',
            className: 'attrs-class',
            style: { backgroundColor: 'attrs-style-test' }
          };
          wrapper = shallow(<HeaderCell column={ column } index={ index } />);

          expect(wrapper.length).toBe(1);
          expect(wrapper.find('th').prop('data-test')).toEqual(column.headerAttrs['data-test']);
          expect(wrapper.find('th').prop('title')).toEqual(column.headerAttrs.title);
          expect(wrapper.hasClass(column.headerAttrs.className)).toBe(true);
          expect(wrapper.find('th').prop('style')).toEqual(column.headerAttrs.style);
        });

        describe('when column.headerTitle prop is defined', () => {
          it('title should be overwrited', () => {
            column.headerAttrs = { title: 'title' };
            column.headerTitle = true;
            wrapper = shallow(<HeaderCell column={ column } index={ index } />);

            expect(wrapper.find('th').prop('title')).toBe(column.text);
          });
        });

        describe('when column.headerClasses prop is defined', () => {
          it('class should be overwrited', () => {
            column.headerClasses = 'td-test-class';
            column.headerAttrs = { className: 'attrs-class' };

            wrapper = shallow(<HeaderCell column={ column } index={ index } />);

            expect(wrapper.hasClass(column.headerClasses)).toBe(true);
          });
        });

        describe('when column.headerStyle prop is defined', () => {
          it('style should be overwrited', () => {
            column.headerStyle = { backgroundColor: 'red' };
            column.headerAttrs = { style: { backgroundColor: 'attrs-style-test' } };

            wrapper = shallow(<HeaderCell column={ column } index={ index } />);

            expect(wrapper.find('th').prop('style')).toEqual(column.headerStyle);
          });
        });

        describe('when column.headerAlign prop is defined', () => {
          it('style.textAlign should be overwrited', () => {
            column.headerAlign = 'center';
            column.headerAttrs = { style: { textAlign: 'right' } };

            wrapper = shallow(<HeaderCell column={ column } index={ index } />);

            expect(wrapper.find('th').prop('style').textAlign).toEqual(column.headerAlign);
          });
        });
      });

      describe('when headerAttrs is custom function', () => {
        let headerAttrsCallBack;
        const customHeaderAttrs = {
          title: 'title',
          'data-test': 'test'
        };


        beforeEach(() => {
          headerAttrsCallBack = sinon.stub()
            .withArgs(column, index)
            .returns(customHeaderAttrs);
          column.headerAttrs = headerAttrsCallBack;
          wrapper = shallow(<HeaderCell column={ column } index={ index } />);
        });

        it('should render style.headerAttrs correctly', () => {
          expect(wrapper.length).toBe(1);
          expect(wrapper.find('th').prop('data-test')).toEqual(customHeaderAttrs['data-test']);
          expect(wrapper.find('th').prop('title')).toEqual(customHeaderAttrs.title);
        });

        it('should call custom headerAttrs function correctly', () => {
          expect(headerAttrsCallBack.callCount).toBe(1);
          expect(headerAttrsCallBack.calledWith(column, index)).toBe(true);
        });
      });
    });
  });

  describe('when column.sort is enable', () => {
    let column;
    let onSortCallBack;

    beforeEach(() => {
      column = {
        dataField: 'id',
        text: 'ID',
        sort: true
      };
      onSortCallBack = sinon.stub().withArgs(column);
      wrapper = shallow(<HeaderCell column={ column } index={ index } onSort={ onSortCallBack } />);
    });

    it('should have sortable class on header cell', () => {
      expect(wrapper.hasClass('sortable')).toBe(true);
    });

    it('should have onClick event on header cell', () => {
      expect(wrapper.find('th').prop('onClick')).toBeDefined();
    });

    it('should trigger onSort callback when click on header cell', () => {
      wrapper.find('th').simulate('click');
      expect(onSortCallBack.callCount).toBe(1);
    });

    describe('and sorting prop is false', () => {
      it('header should render SortSymbol as default', () => {
        expect(wrapper.find(SortSymbol).length).toBe(1);
      });
    });

    describe('and sorting prop is true', () => {
      [Const.SORT_ASC, Const.SORT_DESC].forEach((order) => {
        describe(`and sortOrder is ${order}`, () => {
          beforeEach(() => {
            wrapper = shallow(
              <HeaderCell column={ column } index={ index } sortOrder={ order } sorting />);
          });

          it('should render SortCaret correctly', () => {
            expect(wrapper.find(SortCaret).length).toBe(1);
            expect(wrapper.find(SortCaret).prop('order')).toEqual(order);
          });
        });
      });

      describe('when headerSortingClasses is defined ', () => {
        const classes = 'foo';
        const order = Const.SORT_DESC;

        describe('if headerSortingClasses is a string', () => {
          beforeEach(() => {
            column = { ...column, headerSortingClasses: classes };
            wrapper = shallow(
              <HeaderCell
                column={ column }
                index={ index }
                sorting
                sortOrder={ order }
              />);
          });

          it('should append classes correctly', () => {
            expect(wrapper.length).toBe(1);
            expect(wrapper.hasClass(classes)).toBe(true);
          });

          it('should have sortable class on header cell', () => {
            expect(wrapper.hasClass('sortable')).toBe(true);
          });
        });

        describe('if headerSortingClasses is a function', () => {
          let classesCallBack;
          let isLastSorting;

          beforeEach(() => {
            classesCallBack = sinon.stub()
              .withArgs(column, order, isLastSorting, index)
              .returns(classes);

            column = { ...column, headerSortingClasses: classesCallBack };
            wrapper = shallow(
              <HeaderCell
                column={ column }
                index={ index }
                sorting
                sortOrder={ order }
              />);
          });

          it('should append classes correctly', () => {
            expect(wrapper.length).toBe(1);
            expect(wrapper.hasClass(classes)).toBe(true);
          });

          it('should have sortable class on header cell', () => {
            expect(wrapper.hasClass('sortable')).toBe(true);
          });

          it('should call custom class function with correct params', () => {
            expect(classesCallBack.callCount).toBe(1);
            expect(classesCallBack.calledWith(column, order, isLastSorting, index)).toBe(true);
          });

          describe('when the field is last sorting', () => {
            it('should call custom classes function with isLastSorting being true', () => {
              isLastSorting = true;
              classesCallBack.reset();

              wrapper = shallow(
                <HeaderCell
                  column={ column }
                  index={ index }
                  sorting
                  sortOrder={ order }
                  isLastSorting
                />);

              expect(classesCallBack.callCount).toBe(1);
              expect(classesCallBack.calledWith(column, order, isLastSorting, index)).toBe(true);
            });
          });
        });

        describe('if column.headerClasses is defined as well', () => {
          it('should keep both classes', () => {
            column = {
              ...column,
              headerClasses: 'td-test-class',
              headerSortingClasses: classes
            };

            wrapper = shallow(
              <HeaderCell
                column={ column }
                index={ index }
                sorting
                sortOrder={ order }
              />
            );

            expect(wrapper.length).toBe(1);
            expect(wrapper.hasClass('sortable')).toBe(true);
            expect(wrapper.hasClass(classes)).toBe(true);
            expect(wrapper.hasClass(column.headerClasses)).toBe(true);
          });
        });
      });

      describe('when headerSortingStyle is defined', () => {
        const style = { backgroundColor: 'red' };
        const order = Const.SORT_DESC;

        describe('if headerSortingStyle is an object', () => {
          beforeEach(() => {
            column = { ...column, headerSortingStyle: style };

            wrapper = shallow(
              <HeaderCell
                column={ column }
                index={ index }
                sorting
                sortOrder={ order }
              />
            );
          });

          it('should append style correctly', () => {
            expect(wrapper.length).toBe(1);
            expect(wrapper.find('th').prop('style')).toEqual(style);
          });
        });

        describe('if headerSortingStyle is a function', () => {
          let styleCallBack;
          let isLastSorting;

          beforeEach(() => {
            styleCallBack = sinon.stub()
              .withArgs(column, order, isLastSorting, index)
              .returns(style);

            column = { ...column, headerSortingStyle: styleCallBack };

            wrapper = shallow(
              <HeaderCell
                column={ column }
                index={ index }
                sorting
                sortOrder={ order }
              />);
          });

          it('should append style correctly', () => {
            expect(wrapper.length).toBe(1);
            expect(wrapper.find('th').prop('style')).toEqual(style);
          });

          it('should call custom style function with correct params', () => {
            expect(styleCallBack.callCount).toBe(1);
            expect(styleCallBack.calledWith(column, order, isLastSorting, index)).toBe(true);
          });

          describe('when the field is last sorting', () => {
            it('should call custom classes function with isLastSorting being true', () => {
              isLastSorting = true;
              styleCallBack.reset();

              wrapper = shallow(
                <HeaderCell
                  column={ column }
                  index={ index }
                  sorting
                  sortOrder={ order }
                  isLastSorting
                />);

              expect(styleCallBack.callCount).toBe(1);
              expect(styleCallBack.calledWith(column, order, isLastSorting, index)).toBe(true);
            });
          });
        });

        describe('if column.headerStyle was defined as well', () => {
          it('should keep both styles', () => {
            column = {
              ...column,
              headerStyle: { opacity: '1' },
              headerSortingStyle: style
            };

            wrapper = shallow(
              <HeaderCell
                column={ column }
                index={ index }
                sorting
                sortOrder={ order }
              />
            );
            expect(wrapper.length).toBe(1);
            expect(wrapper.find('th').prop('style')).toEqual(expect.objectContaining({
              ...style,
              ...column.headerStyle
            }));
          });

          it('headerSortingStyle should have higher priority', () => {
            column = {
              ...column,
              headerStyle: { backgroundColor: 'green' },
              headerSortingStyle: style
            };

            wrapper = shallow(
              <HeaderCell
                column={ column }
                index={ index }
                sorting
                sortOrder={ order }
              />
            );
            expect(wrapper.length).toBe(1);
            expect(wrapper.find('th').prop('style')).toEqual(expect.objectContaining({
              ...style
            }));
            expect(wrapper.find('th').prop('style')).not.toEqual(expect.objectContaining({
              ...column.headerStyle
            }));
          });
        });
      });
    });

    describe('when column.headerEvents prop is defined and have custom onClick', () => {
      beforeEach(() => {
        column = {
          dataField: 'id',
          text: 'ID',
          sort: true,
          headerEvents: {
            onClick: sinon.stub()
          }
        };
        wrapper = shallow(
          <HeaderCell column={ column } index={ index } onSort={ onSortCallBack } />);
      });

      it('custom event hook should still be called when triggering sorting', () => {
        wrapper.find('th').simulate('click');
        expect(onSortCallBack.callCount).toBe(1);
        expect(column.headerEvents.onClick.callCount).toBe(1);
      });
    });
  });

  describe('when column.filter is defined', () => {
    const onFilter = jest.fn();
    const filterProps = { a: 123 };
    const Filter = () => <div>test</div>;
    let column;

    beforeEach(() => {
      onFilter.mockClear();
      column = {
        dataField: 'id',
        text: 'ID',
        filter: {
          props: filterProps,
          Filter
        }
      };
      wrapper = shallow(<HeaderCell column={ column } index={ index } onFilter={ onFilter } />);
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('th').length).toBe(1);
    });

    it('should render filter correctly', () => {
      expect(wrapper.find(Filter).length).toBe(1);
      expect(wrapper.find(Filter).props()).toEqual({
        column,
        onFilter,
        ...filterProps
      });
    });
  });

  describe('when column.filter and column.filterRenderer is defined', () => {
    const onExternalFilter = jest.fn();
    const filterProps = { a: 123 };
    const Filter = () => <div>test</div>;
    const filterRenderer = jest.fn().mockReturnValue(<Filter />);
    let column;

    beforeEach(() => {
      onExternalFilter.mockClear();
      filterRenderer.mockClear();
      column = {
        dataField: 'id',
        text: 'ID',
        filter: {
          props: filterProps
        },
        filterRenderer
      };
      wrapper = shallow(
        <HeaderCell column={ column } index={ index } onExternalFilter={ onExternalFilter } />);
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('th').length).toBe(1);
    });

    it('should render filter correctly', () => {
      expect(wrapper.find(Filter).length).toBe(1);
    });

    it('should call filterRenderer function correctly', () => {
      expect(filterRenderer).toHaveBeenCalledTimes(1);
    });
  });
});
