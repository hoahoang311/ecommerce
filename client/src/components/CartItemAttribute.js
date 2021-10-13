import React, {Component} from 'react'

export class CartItemAttribute extends Component {
  render () {
    const {attribute, firstValue, selectedAttributes} = this.props

    return firstValue !== 'Yes' ? (
      <div className='attribute'>
        {attribute.items.map((item, index) => {
          const isSelected =
            selectedAttributes.filter((a) => a.attribute == attribute.name)[0]
              .item == item.value

          return attribute.type !== 'swatch' ? (
            <div
              key={index}
              className={`option ${!isSelected ? 'not-selected' : 'selected'}`}>
              {item.value}
            </div>
          ) : (
            <div
              style={{
                opacity: isSelected ? 1 : 0.2,
                width: isSelected ? 50 : 35,
                height: isSelected ? 50 : 35,
                backgroundColor: item.value,
                marginRight: 5,
                border: item.id == 'White' ? '1px solid black' : undefined,
              }}
              key={index}
            />
          )
        })}
      </div>
    ) : (
      <div className='attribute'>
        <span>{`${attribute.name}: ${
          selectedAttributes.filter((a) => a.attribute == attribute.name)[0]
            .item
        }`}</span>
      </div>
    )
  }
}
export default CartItemAttribute
