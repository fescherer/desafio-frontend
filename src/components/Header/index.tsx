import { Logo } from '../../assets/logo';
import './style.css';

export function Header() {
  return (
    <header>
      <img src="https://4innovation.co/wp-content/uploads/2021/08/logo.png" alt="4Innovation" width={200}></img>
      <Logo />
    </header>
  );
}
