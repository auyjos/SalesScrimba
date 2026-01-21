import { useActionState } from "react";


const Signin = () => {
const[error, submitAction, isPending] = useActionState(
  async(prevError, formData) => {
    const email = formData.get("email")?.toString().trim() ?? ""
    const password = formData.get("password")?.toString().trim() ?? ""
   
    if(!email || !password){
        return "Email and password are required.";
    }
  
    try {
      // Add your authentication logic here
      
      return null;
    } catch (err) {
        console.error("Sign in error:", err);
        return "Failed to sign in. Please try again.";
    }
  },
  null
)

  return (
    <>
      <h1 className="landing-header">Paper Like A Boss</h1>
      <div className="sign-form-container">
        <form
          action={submitAction}
          aria-label="Sign in form"
          aria-describedby="form-description"
        >
          <div id="form-description" className="sr-only">
            Use this form to sign in to your account. Enter your email and
            password.
          </div>

          <h2 className="form-title">Sign in</h2>
          <p>
            Don't have an account yet?{' '}
            {/*<Link className="form-link">*/}
              Sign up
           {/*</Link>*/}
          </p>

          <label htmlFor="email">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            id="email"
            placeholder=""
            required
            aria-required="true"
            aria-invalid={Boolean(error)}
            aria-describedby="form-input"
            disabled={isPending}
          />

          <label htmlFor="password">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            id="password"
            placeholder=""
            required
           aria-required="true"
            aria-invalid={Boolean(error)}
            aria-describedby="form-input"
            disabled={isPending}
          />

          <button
            type="submit"
            className="form-button"
           disabled={isPending}
            aria-busy={isPending}
          >
            Sign In
            {/*'Signing in...' when pending*/}
          </button>
          
          {/* Error message */}
        </form>
      </div>
    </>
  );
};

export default Signin;