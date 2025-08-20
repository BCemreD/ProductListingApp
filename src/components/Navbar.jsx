import { Disclosure, DisclosureButton, DisclosurePanel, } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import LogoutButton from '../components/User/LogoutButton';
import { useAuthStore } from '../store/useAuthStore';

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Products', href: '/products', current: false },
  { name: 'Favorites', href: '/favorites', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const location = useLocation();
  const { user } = useAuthStore();

  return (
    <Disclosure as="nav" className=" bg-gradient-to-b from-white to-gray-300">
      <div className="mx-auto w-full px-2 sm:px-6 lg:px-8 ">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-sky-500 font-semibold hover:bg-sky-500/50 hover:text-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center gap-8 py-8 justify-start sm:items-stretch">
            <div className="flex w-full justify-center sm:justify-start items-center">

              {/* Linked logo */}
              <Link to="/">
                <img
                  alt="Your Company"
                  src="/images/logo.png"
                  className="h-16 w-auto"
                />
              </Link>
              <span className="text-sky-500 px-8 font-semibold hidden sm:inline"><Link to="/">BCemreD</Link></span>
            </div>

            {/*Web View */}

            <div className="hidden sm:ml-auto py-8 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                  const isActive = item.href === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={classNames(
                        isActive ? 'bg-sky-500 text-white' : 'text-sky-500 font-semibold hover:bg-sky-500/50 hover:text-white',
                        'rounded-md px-3 py-2 font-semibold',
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                {user ? (
                  <LogoutButton />
                ) : (
                  <Link
                    to="/login"
                    className={classNames(
                      location.pathname === '/login' ? 'bg-sky-500 text-white' : 'text-sky-500 font-semibold hover:bg-sky-500/50 hover:text-white',
                      'rounded-md px-3 py-2 font-semibold'
                    )}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          </div>
        </div>
      </div>

      {/*Mobile menu panel*/}
      <DisclosurePanel className="sm:hidden">
        <div className=" bg-gray-200 space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => {
            const isActive = item.href === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.href);

            return (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={classNames(
                  isActive ? 'bg-sky-500 text-white' : ' text-sky-500 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-semibold',
                )}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
          {user ? (
            <DisclosureButton as="div" className="block w-full text-left">
              <LogoutButton />
            </DisclosureButton>
          ) : (
            <DisclosureButton
              as={Link}
              to="/login"
              className={classNames(
                location.pathname === '/login' ? 'bg-sky-500 text-white' : 'text-sky-500 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-semibold'
              )}
            >
              Login
            </DisclosureButton>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}