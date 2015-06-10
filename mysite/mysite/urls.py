from django.conf.urls import patterns, url, include
from mysite.views import IndexView
from rest_framework_nested import routers
from authentication.views import AccountViewSet, LoginView, LogoutView
from posts.views import AccountPostsViewSet, PostViewSet
from django.conf.urls.static import static
from django.conf import settings

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)

router.register(r'posts', PostViewSet)

accounts_router = routers.NestedSimpleRouter(
    router, r'accounts', lookup='account'
)
accounts_router.register(r'posts', AccountPostsViewSet)

urlpatterns = patterns(
     '',
    # ... URLs
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(accounts_router.urls)),
    url('^.*$', IndexView.as_view(), name='index'),
)  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)