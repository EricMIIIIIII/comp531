import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'
import {expect} from 'chai'

import { ToDoItem } from './todoItem'

describe('Validate ToDoItem', () => {

	it('should display a single ToDo', () => {
		// use TestUtils.renderIntoDocument
		const node = TestUtils.renderIntoDocument(<div>
			<ToDoItem id={0} text={"newtask"} done={false} toggle={_=>_} remove={_=>_}/>
		</div>)
		// findDOMNode and assert 3 children of the ToDoItem element
		const elements = findDOMNode(node).children[0]
		expect(elements.children.length).to.equals(3)
		// assert the className is ''
		expect(elements.className).to.equal('')
		// assert the innerHTML of the todo is the text you initially set
		expect(elements.children[1].innerHTML).to.equal("newtask")

	})

	it('should toggle completed when clicked', () => {
		let toggled = false
		// use TestUtils.renderIntoDocument
		const node = TestUtils.renderIntoDocument(<div>
			<ToDoItem id={0} text={"newtask"} done={false} toggle={() => {toggled = !toggled}}  remove={_=>_}/>
		</div>)
		const elements = findDOMNode(node).children[0]
		// when the checkbox is clicked via TestUtils.Simulate.click()
		TestUtils.Simulate.click(elements.children[0])
		// we expect the variable toggled to be true
		expect(toggled).to.equals.true
	})

	it('should remove an item when clicked', () => {
		let removed = false
		// use TestUtils.renderIntoDocument
		const node = TestUtils.renderIntoDocument(<div>
			<ToDoItem id={0} text={"newtask"} done={false} toggle={_=>_}  remove={() => removed = true}/>
		</div>)
		const elements = findDOMNode(node).children[0]
		// when the remove button is clicked via TestUtils.Simulate.click()
		TestUtils.Simulate.click(elements.children[2])
		// we expect the variable removed to be true
		expect(removed).to.be.equals.true
	})

	it('should display a completed ToDo', () => {
		// use TestUtils.renderIntoDocument
		// the item should have done=true
		const node = TestUtils.renderIntoDocument(<div>
			<ToDoItem id={0} text={"newtask"} done={true} toggle={_=>_}  remove={_=>_}/>
		</div>)
		const elements = findDOMNode(node).children[0]
		// assert that the rendered className is "completed"
		expect(elements.children[1].className).to.equal("completed")
	})

})
