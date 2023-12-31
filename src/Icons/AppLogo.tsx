
import type { SVGProps } from "react";

const AppLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 22 22"
    fill="#417db5"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.09 3.377c-1.51-.754-3.195-.318-4.205.807a1 1 0 0 1-.659.328C4.49 4.661 3 6.1 3 8.02v7.962c0 1.92 1.49 3.358 3.226 3.507a1 1 0 0 1 .66.328c1.009 1.125 2.694 1.561 4.203.807l7.967-3.98c1.7-.85 2.295-2.735 1.748-4.316a1 1 0 0 1 0-.654c.547-1.582-.048-3.466-1.748-4.315L11.09 3.377Zm-5.422-.81c1.586-1.534 4.07-2.101 6.315-.98l7.967 3.981C22.516 6.85 23.453 9.63 22.796 12c.657 2.37-.28 5.15-2.846 6.431l-7.967 3.981c-2.245 1.122-4.73.555-6.315-.979C3.138 21.033 1 18.867 1 15.981V8.019c0-2.886 2.137-5.051 4.668-5.452Zm4.268 3.725C8.126 5.388 6 6.703 6 8.722v6.556c0 2.019 2.127 3.334 3.936 2.43l6.56-3.278c2.005-1.001 2.005-3.859 0-4.86l-6.56-3.278ZM4 8.722c0-3.508 3.693-5.787 6.83-4.22l6.56 3.279c3.48 1.738 3.48 6.7 0 8.438l-6.56 3.278C7.693 21.065 4 18.786 4 15.278V8.722Z"
      fill="currentColor"
    />
     <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.36 10.065a.594.594 0 0 0-.86.53v2.81c0 .44.464.728.86.53l2.812-1.405a.593.593 0 0 0 0-1.06l-2.812-1.405Zm-2.86.53c0-1.929 2.03-3.18 3.754-2.32l2.812 1.406c1.912.955 1.912 3.683 0 4.638l-2.812 1.405c-1.724.862-3.754-.39-3.754-2.319v-2.81Z"
      fill="currentColor"
    />
  </svg>
);

export default AppLogo;
