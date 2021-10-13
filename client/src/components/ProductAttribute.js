import React, {Component} from 'react'
import {isEmpty} from 'lodash'
import {connect} from 'react-redux'

export class ProductAttribute extends Component {
  constructor (props) {
    super(props)
  }

  handleAttributes = (attribute, selectedOption) => {
    this.props.handleAttributes(attribute, selectedOption)
  }

  render () {
    const {attributes, selectedAttributes} = this.props

    return (
      <div>
        {attributes.map((a) => {
          const noOfOptions = a.items.length
          return (
            <div className='product-attribute' key={a.id}>
              <span className='title'>{a.name}:</span>
              <div
                className={`options ${
                  noOfOptions > 2 ? 'options-long-list' : 'options-short-list'
                }`}>
                {a.items.map((option) => {
                  const hasSelected = !isEmpty(selectedAttributes)
                    ? !isEmpty(
                        selectedAttributes
                          .filter((attribute) => attribute.attribute == a.name)
                          .find((attribute) => attribute.item == option.value),
                      )
                    : null
                  return a.type == 'swatch' ? (
                    <div
                      className={`swatch ${
                        hasSelected ? 'swatch-selected' : undefined
                      } ${option.id == 'White' ? 'swatch-white' : undefined}`}
                      style={{
                        backgroundColor: option.displayValue,
                      }}
                      key={option.id}
                      title={option.id}
                      onClick={() =>
                        this.handleAttributes(a.name, option.value)
                      }
                    />
                  ) : (
                    <div
                      key={option.id}
                      value={option.value}
                      onClick={() =>
                        this.handleAttributes(a.name, option.value)
                      }
                      className={`option ${
                        hasSelected ? 'option-selected' : 'option-unselected'
                      } ${noOfOptions <= 2 ? 'option-short-list' : undefined}`}>
                      {option.value}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default connect()(ProductAttribute)
