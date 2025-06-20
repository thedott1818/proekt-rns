import type { Pizza, Ingredient, Customer, Order, Delivery } from "../models"

class Database {
  private pizzas: Pizza[] = [
    {
      id: "1",
      name: "Маргарита",
      ingredients: ["доматен сос", "моцарела", "босилек"],
      price: 12.5,
    },
    {
      id: "2",
      name: "Пеперони",
      ingredients: ["доматен сос", "моцарела", "пеперони"],
      price: 15.0,
    },
  ]

  private ingredients: Ingredient[] = [
    {
      id: "1",
      name: "доматен сос",
      allergens: [],
      availability: true,
    },
    {
      id: "2",
      name: "моцарела",
      allergens: ["мляко"],
      availability: true,
    },
    {
      id: "3",
      name: "босилек",
      allergens: [],
      availability: true,
    },
    {
      id: "4",
      name: "пеперони",
      allergens: [],
      availability: true,
    },
  ]

  private customers: Customer[] = []
  private orders: Order[] = []
  private deliveries: Delivery[] = []

  // Pizza CRUD
  getAllPizzas(): Pizza[] {
    return this.pizzas
  }

  getPizzaById(id: string): Pizza | undefined {
    return this.pizzas.find((pizza) => pizza.id === id)
  }

  createPizza(pizza: Omit<Pizza, "id">): Pizza {
    const newPizza: Pizza = {
      id: Date.now().toString(),
      ...pizza,
    }
    this.pizzas.push(newPizza)
    return newPizza
  }

  updatePizza(id: string, updates: Partial<Omit<Pizza, "id">>): Pizza | null {
    const index = this.pizzas.findIndex((pizza) => pizza.id === id)
    if (index === -1) return null

    this.pizzas[index] = { ...this.pizzas[index], ...updates }
    return this.pizzas[index]
  }

  deletePizza(id: string): boolean {
    const index = this.pizzas.findIndex((pizza) => pizza.id === id)
    if (index === -1) return false

    // Check if pizza is used in any orders
    const isUsedInOrders = this.orders.some((order) => order.pizzas.includes(id))
    if (isUsedInOrders) {
      throw new Error("Cannot delete pizza that is used in orders")
    }

    this.pizzas.splice(index, 1)
    return true
  }

  // Ingredient CRUD
  getAllIngredients(): Ingredient[] {
    return this.ingredients
  }

  getIngredientById(id: string): Ingredient | undefined {
    return this.ingredients.find((ingredient) => ingredient.id === id)
  }

  createIngredient(ingredient: Omit<Ingredient, "id">): Ingredient {
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      ...ingredient,
    }
    this.ingredients.push(newIngredient)
    return newIngredient
  }

  updateIngredient(id: string, updates: Partial<Omit<Ingredient, "id">>): Ingredient | null {
    const index = this.ingredients.findIndex((ingredient) => ingredient.id === id)
    if (index === -1) return null

    this.ingredients[index] = { ...this.ingredients[index], ...updates }
    return this.ingredients[index]
  }

  deleteIngredient(id: string): boolean {
    const index = this.ingredients.findIndex((ingredient) => ingredient.id === id)
    if (index === -1) return false

    this.ingredients.splice(index, 1)
    return true
  }

  // Customer CRUD
  getAllCustomers(): Customer[] {
    return this.customers
  }

  getCustomerById(id: string): Customer | undefined {
    return this.customers.find((customer) => customer.id === id)
  }

  createCustomer(customer: Omit<Customer, "id">): Customer {
    const newCustomer: Customer = {
      id: Date.now().toString(),
      ...customer,
    }
    this.customers.push(newCustomer)
    return newCustomer
  }

  updateCustomer(id: string, updates: Partial<Omit<Customer, "id">>): Customer | null {
    const index = this.customers.findIndex((customer) => customer.id === id)
    if (index === -1) return null

    this.customers[index] = { ...this.customers[index], ...updates }
    return this.customers[index]
  }

  deleteCustomer(id: string): boolean {
    const index = this.customers.findIndex((customer) => customer.id === id)
    if (index === -1) return false

    // Check if customer has orders
    const hasOrders = this.orders.some((order) => order.customerId === id)
    if (hasOrders) {
      throw new Error("Cannot delete customer with existing orders")
    }

    this.customers.splice(index, 1)
    return true
  }

  // Order CRUD
  getAllOrders(): Order[] {
    return this.orders
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.find((order) => order.id === id)
  }

  createOrder(order: Omit<Order, "id" | "createdAt">): Order {
    // Validate customer exists
    if (!this.getCustomerById(order.customerId)) {
      throw new Error("Customer not found")
    }

    // Validate pizzas exist
    for (const pizzaId of order.pizzas) {
      if (!this.getPizzaById(pizzaId)) {
        throw new Error(`Pizza with id ${pizzaId} not found`)
      }
    }

    const newOrder: Order = {
      id: Date.now().toString(),
      createdAt: new Date(),
      ...order,
    }
    this.orders.push(newOrder)
    return newOrder
  }

  updateOrder(id: string, updates: Partial<Omit<Order, "id" | "createdAt">>): Order | null {
    const index = this.orders.findIndex((order) => order.id === id)
    if (index === -1) return null

    this.orders[index] = { ...this.orders[index], ...updates }
    return this.orders[index]
  }

  deleteOrder(id: string): boolean {
    const index = this.orders.findIndex((order) => order.id === id)
    if (index === -1) return false

    // Check if order has delivery
    const hasDelivery = this.deliveries.some((delivery) => delivery.orderId === id)
    if (hasDelivery) {
      throw new Error("Cannot delete order with existing delivery")
    }

    this.orders.splice(index, 1)
    return true
  }

  // Delivery CRUD
  getAllDeliveries(): Delivery[] {
    return this.deliveries
  }

  getDeliveryById(id: string): Delivery | undefined {
    return this.deliveries.find((delivery) => delivery.id === id)
  }

  createDelivery(delivery: Omit<Delivery, "id">): Delivery {
    // Validate order exists
    if (!this.getOrderById(delivery.orderId)) {
      throw new Error("Order not found")
    }

    const newDelivery: Delivery = {
      id: Date.now().toString(),
      ...delivery,
    }
    this.deliveries.push(newDelivery)
    return newDelivery
  }

  updateDelivery(id: string, updates: Partial<Omit<Delivery, "id">>): Delivery | null {
    const index = this.deliveries.findIndex((delivery) => delivery.id === id)
    if (index === -1) return null

    this.deliveries[index] = { ...this.deliveries[index], ...updates }
    return this.deliveries[index]
  }

  deleteDelivery(id: string): boolean {
    const index = this.deliveries.findIndex((delivery) => delivery.id === id)
    if (index === -1) return false

    this.deliveries.splice(index, 1)
    return true
  }
}

export const database = new Database()
