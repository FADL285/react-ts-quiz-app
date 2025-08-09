import { useReducer } from "react";

// Types
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Action types
type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

// Initial state
const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

// Sample products
const products = [
  { id: 1, name: "Laptop", price: 999.99 },
  { id: 2, name: "Mouse", price: 29.99 },
  { id: 3, name: "Keyboard", price: 89.99 },
  { id: 4, name: "Monitor", price: 299.99 },
];

// Reducer function
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // Update quantity if item already exists
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
          itemCount: calculateItemCount(updatedItems),
        };
      } else {
        // Add new item
        const newItem = { ...action.payload, quantity: 1 };
        const updatedItems = [...state.items, newItem];

        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
          itemCount: calculateItemCount(updatedItems),
        };
      }
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );

      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
        itemCount: calculateItemCount(updatedItems),
      };
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        )
        .filter((item) => item.quantity > 0); // Remove items with 0 quantity

      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
        itemCount: calculateItemCount(updatedItems),
      };
    }

    case "CLEAR_CART": {
      return initialState;
    }

    default:
      return state;
  }
}

// Helper functions
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Shopping Cart with useReducer</h1>
        <div className="cart-summary">
          <span>Items: {state.itemCount}</span>
          <span>Total: ${state.total.toFixed(2)}</span>
        </div>
      </header>

      <main className="main">
        <section className="products">
          <h2>Products</h2>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="cart">
          <div className="cart-header">
            <h2>Cart</h2>
            {state.items.length > 0 && (
              <button className="btn btn-secondary" onClick={clearCart}>
                Clear Cart
              </button>
            )}
          </div>

          {state.items.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            <div className="cart-items">
              {state.items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>${item.price} each</p>
                  </div>
                  <div className="item-controls">
                    <div className="quantity-controls">
                      <button
                        className="btn btn-small"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        className="btn btn-small"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
