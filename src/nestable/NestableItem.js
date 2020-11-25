import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Icon from './Icon';

class NestableItem extends Component {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.any.isRequired,
      group: PropTypes.string,
    }),
    isCopy: PropTypes.bool,
    options: PropTypes.object,
    index: PropTypes.number,
    showAppendGroup: PropTypes.bool,
    level: PropTypes.number,
  };

  renderCollapseIcon = ({ isCollapsed }) => (
    <Icon
      className={cn('nestable-item-icon', {
        'icon-plus-gray': isCollapsed,
        'icon-minus-gray': !isCollapsed,
      })}
    />
  );

  render() {
    const { item, isCopy, options, index, showAppendGroup, level } = this.props;
    const { dragItem, renderItem, handler, childrenProp, renderCollapseIcon = this.renderCollapseIcon } = options;

    const isCollapsed = options.isCollapsed(item);
    const isDragging = !isCopy && dragItem && dragItem.id === item.id;
    const hasChildren = item[childrenProp] && item[childrenProp].length > 0;

    let rowProps = {};
    let handlerProps = {};
    let Handler;

    if (!isCopy) {
      if (dragItem) {
        rowProps = {
          ...rowProps,
          onMouseEnter: (e) => options.onMouseEnter(e, item),
        };
      } else {
        handlerProps = {
          ...handlerProps,
          draggable: true,
          onDragStart: (e) => options.onDragStart(e, item),
        };
      }
    }

    if (handler) {
      Handler = (
        <span className="nestable-item-handler" {...handlerProps}>
          {handler}
        </span>
      );
      //Handler = React.cloneElement(handler, handlerProps);
    } else {
      rowProps = {
        ...rowProps,
        ...handlerProps,
      };
    }

    const collapseIcon = hasChildren ? (
      <span onClick={() => options.onToggleCollapse(item)}>{renderCollapseIcon({ isCollapsed })}</span>
    ) : null;

    const baseClassName = 'nestable-item' + (isCopy ? '-copy' : '');
    const itemProps = {
      className: cn(baseClassName, baseClassName + '-' + item.id, {
        'is-dragging': isDragging,
        [baseClassName + '--with-children']: hasChildren,
        [baseClassName + '--children-open']: hasChildren && !isCollapsed,
        [baseClassName + '--children-collapsed']: hasChildren && isCollapsed,
      }),
    };

    const content = renderItem({ item, collapseIcon, handler: Handler, index });

    if (!content) return null;

    const divProps = {};
    const newGroupDivProps = {};
    if (dragItem) {
      divProps.onMouseEnter = (e) => options.onMouseEnterGroupDiv(e, item);
      newGroupDivProps.onMouseEnter = (e) => options.onMouseEnterNewGroupDiv(e, item);
    }
    const color = options.getGroupColor(item.group);

    return (
      <li {...itemProps}>
        <div
          className="nestable-item-name"
          {...rowProps}
          style={
            level > 0
              ? {
                  borderLeftColor: color,
                  borderLeftWidth: '5px',
                  borderLeftStyle: 'solid',
                  borderTopLeftRadius: '3px',
                  borderBottomLeftRadius: '3px',
                }
              : {}
          }
        >
          {content}
        </div>

        {hasChildren && !isCollapsed && (
          <ol className="nestable-list">
            {item[childrenProp].map((child, i) => {
              const showAppendGroup =
                (i < item[childrenProp].length - 1 && child.group !== item[childrenProp][i + 1].group) ||
                i === item[childrenProp].length - 1;
              return (
                <NestableItem
                  key={i}
                  index={i}
                  item={child}
                  options={options}
                  isCopy={isCopy}
                  showAppendGroup={showAppendGroup}
                  level={level + 1}
                />
              );
            })}
          </ol>
        )}
        {(!dragItem || (dragItem && item.id !== dragItem.id)) && showAppendGroup && dragItem && (
          <div style={{ background: color, paddingBottom: '20px', fontSize: '14px' }} {...divProps}></div>
        )}
        {showAppendGroup && dragItem && (
          <div style={{ background: 'darkgreen', paddingBottom: '25px', fontSize: '14px' }} {...newGroupDivProps}>
            Make new group
          </div>
        )}
      </li>
    );
  }
}

export default NestableItem;
