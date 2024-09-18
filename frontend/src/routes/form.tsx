import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import type { FieldApi } from '@tanstack/react-form'
import { api } from '@/lib/api'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { createUsersSchema } from '@server/sharedTypes'

export const Route = createFileRoute('/form')({
  component: Form
})

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}

function Form() {
  const navigate = useNavigate()

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      user: '',
      fullName: '',
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      const res = await api.auth.users.$post({ json: value })
      if (!res.ok) {
        throw new Error("server error")
      }
      console.log(value)
      navigate({ to: '/' })
    },
  })

  return (
    <div>
      <h1>Simple Form Example</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="user"
            // validatorAdapter={zodValidator()}
            validators={{
              onChange: createUsersSchema.shape.user,
            }}
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label htmlFor={field.name}>Usuário:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              )
            }}
          />
        </div>
        <div>
          <form.Field
            name="fullName"
            validators={{
              onChange: createUsersSchema.shape.fullName,
            }}
            children={(field) => (
              <>
                <label htmlFor={field.name}>Nome completo:</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <div>
          <form.Field
            name="email"
            validators={{
              onChange: createUsersSchema.shape.email,
            }}
            children={(field) => (
              <>
                <label htmlFor={field.name}>Email:</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <div>
          <form.Field
            name="password"
            validators={{
              onChange: createUsersSchema.shape.password,
            }}
            children={(field) => (
              <>
                <label htmlFor={field.name}>Senha:</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <div>
          <form.Field
            name="password"
            validators={{
              onChange: createUsersSchema.shape.password,
            }}
            children={(field) => (
              <>
                <label htmlFor={field.name}>Confirmar Senha:</label>
                <input
                  id={field.name}
                  name={'Confirmar senha'}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button type="submit" disabled={!canSubmit}>
              {isSubmitting ? '...' : 'Submit'}
            </button>
          )}
        />
      </form>
    </div>
  )
}