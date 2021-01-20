import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

describe("Profile Status class component basic tests", () => {

    let container = null;
    beforeEach(() => {
        // подготавливаем DOM-элемент, куда будем рендерить
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        // подчищаем после завершения
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });


    test("Render component with/without status should be correctly", () => {
        act(() => {
            render(<ProfileStatusWithHooks status={"test status"}/>, container);
        });
        expect(container.textContent).toBe("test status");

        act(() => {
            render(<ProfileStatusWithHooks status={""}/>, container);
        });
        expect(container.textContent).toBe("");
    })

    test("Edit mode of status should be activated after mouse double click", () => {
        act(() => {
            render(<ProfileStatusWithHooks status={"test status"} />, container);
        });

        const fieldInput = document.querySelector('span');

        act(() => {
            fieldInput.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
        });

        const fieldInputAfterClick = document.querySelector('input');
        expect(fieldInputAfterClick).toBeDefined();
        expect(fieldInputAfterClick).toBeValid();
    })

    test("After render <span> should be in DOM, but <input> not should be in DOM", () => {
        act(() => {
            render(<ProfileStatusWithHooks status={"test status"} />, container);
        });

        const span = document.querySelector('span');
        const input = document.querySelector('input');

        expect(span).not.toBeNull();
        expect(input).toBeNull();
    })



/*    test("Callback 'updateStatus' should be called", () => {
        const mockCallback = jest.fn();


        act(() => {
            render(<ProfileStatusWithHooks  status={"test status"} updateStatus={mockCallback} />, container);
        });

        //const cont = container;

        const span = document.querySelector('span');

        act(() => {
            span.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
        });

        const input = document.querySelector('input');

        const cont = input
        input.props.onBlur()


        expect(mockCallback).toBeCalled();
    })*/
})