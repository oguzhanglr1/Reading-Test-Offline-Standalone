# Reading-Test Offline

Bu klasör, mevcut Reading-Test projesinin Tomcat ve MySQL gerektirmeyen bağımsız sürümüdür.

## Nasıl çalıştırılır

1. index.html dosyasını çift tıklayarak veya tarayıcıda açarak projeyi başlat.
2. Kayıt ol ve giriş yap.
3. Tüm veriler tarayıcı localStorage içinde tutulur.

## GitHub Pages ile yayinlama

1. Bu klasoru GitHub'a public bir repository olarak yukle.
2. Repository icinde Settings > Pages kismina gir.
3. Source olarak Deploy from a branch sec.
4. Branch olarak main ve klasor olarak /(root) sec.
5. Save dedikten sonra GitHub sana yayin linki uretecektir.

Not: Uygulama statik oldugu icin GitHub Pages ile calisir. Veriler yine siteyi acan kisinin kendi tarayicisinda localStorage icinde tutulur.

## Neler içerir

- Kayıt olma
- Giriş yapma
- Okuma testi başlatma
- Sonuçları kaydetme ve silme
- Yorum ekleme ve silme
- Profil görüntüleme
- Kullanıcı adı ve şifre değiştirme

## Not

- Veriler sadece bu tarayıcıda saklanır.
- Tarayıcı verileri temizlenirse kullanıcılar, yorumlar ve skorlar silinir.
- Bu proje demo ve offline kullanim icindir; gercek sifreler veya hassas kisisel veriler ile kullanilmasi onerilmez.
- Public olarak paylasilabilir, ancak tarayici depolamasi ve istemci tarafi giris mantigi nedeniyle uretim seviyesi guvenlik saglamaz.