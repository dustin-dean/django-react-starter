from ninja import NinjaAPI
from accounts.api import router as accounts_router

api = NinjaAPI(csrf=True)

api.add_router("/accounts/", accounts_router)
