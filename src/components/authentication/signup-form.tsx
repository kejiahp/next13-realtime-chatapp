import Logo from "../logo/logo";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";

type Props = {};

function SignUpForm({}: Props) {
  return (
    <form className="rounded-lg shadow-lg dark:shadow-none flex flex-col gap-4 p-5">
      <Logo />

      <div>
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="kilogram@gmail.com" type="text" />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="kilogram@gmail.com" type="email" />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          placeholder="kilogram_sama_UwU😳"
          type="password"
        />
      </div>

      <div>
        <Label htmlFor="profile-photo">Profile Photo</Label>
        <Input id="profile-photo" type="file" accept="image/*" />
      </div>

      <Button variant={"secondary"}>Login</Button>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>

      <Button variant="outline" type="button" disabled={false}>
        {false ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </form>
  );
}

export default SignUpForm;