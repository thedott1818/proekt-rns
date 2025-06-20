import express from "express"
import cors from "cors"
import { database } from "./services/database"
import { validateRequired, validatePhone } from "./utils/validation"

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get("/api/pizzas", (req, res) => {
  res.json(database.getAllPizzas())
})

app.get("/api/pizzas/:id", (req, res) => {
  const pizza = database.getPizzaById(req.params.id)
  if (!pizza) {
    return res.status(404).json({ error: "Pizza not found" })
  }
  res.json(pizza)
})

app.post("/api/pizzas", (req, res) => {
  
  const errors = validateRequired(req.body, ["name", "ingredients", "price"])
  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  try {
    const pizza = database.createPizza(req.body)
    res.status(201).json(pizza)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
})

app.put("/api/pizzas/:id", (req, res) => {
  try {
    const pizza = database.updatePizza(req.params.id, req.body)
    if (!pizza) {
      return res.status(404).json({ error: "Pizza not found" })
    }
    res.json(pizza)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
})

app.delete("/api/pizzas/:id", (req, res) => {
  try {
    const deleted = database.deletePizza(req.params.id)
    if (!deleted) {
      return res.status(404).json({ error: "Pizza not found" })
    }
    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
})

app.get("/api/ingredients", (req, res) => {
  res.json(database.getAllIngredients())
})

app.post("/api/ingredients", (req, res) => {
  const errors = validateRequired(req.body, ["name"])
  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  try {
    const ingredient = database.createIngredient(req.body)
    res.status(201).json(ingredient)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
})

app.get("/api/customers", (req, res) => {
  res.json(database.getAllCustomers())
})

app.post("/api/customers", (req, res) => {
  const errors = validateRequired(req.body, ["name", "address", "phone"])
  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  if (!validatePhone(req.body.phone)) {
    return res.status(400).json({ error: "Invalid phone number" })
  }

  try {
    const customer = database.createCustomer(req.body)
    res.status(201).json(customer)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
})


app.get("/api/orders", (req, res) => {
  res.json(database.getAllOrders())
})

app.post("/api/orders", (req, res) => {
  const errors = validateRequired(req.body, ["pizzas", "customerId", "totalPrice"])
  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  try {
    const order = database.createOrder({
      ...req.body,
      status: "pending",
    })
    res.status(201).json(order)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
})

app.put("/api/orders/:id", (req, res) => {
  try {
    const order = database.updateOrder(req.params.id, req.body)
    if (!order) {
      return res.status(404).json({ error: "Order not found" })
    }
    res.json(order)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
})


app.get("/api/deliveries", (req, res) => {
  res.json(database.getAllDeliveries())
})

app.post("/api/deliveries", (req, res) => {
  const errors = validateRequired(req.body, ["orderId", "deliveryPerson"])
  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  try {
    const delivery = database.createDelivery({
      ...req.body,
      date: new Date(),
      status: "assigned",
    })
    res.status(201).json(delivery)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
