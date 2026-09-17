from pydantic import BaseModel, Field, ConfigDict 

class ProductBase(BaseModel):
    price: int = Field(..., ge=0)
    count: int = Field(..., ge=0)
    title: str = Field(..., max_length=100)
    category: str = Field(..., max_length=100)
    promotion: bool = Field(default=False)

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    price: int | None = Field(default=None, ge=0)
    count: int | None = Field(default=None, ge=0)
    title: str | None = Field(default=None, max_length=100)
    category: str | None = Field(default=None, max_length=100)
    promotion: bool | None = Field(default=None)

class ProductSearch(BaseModel):
    min_price: int  = Field(default=0, ge=0)
    max_price: int  = Field(default=99999, ge=0)
    category: str  = Field(default="all", max_length=100)
    promotion: bool  = Field(default=False)

class ProductRespon(ProductBase):
    id: int

    model_config = ConfigDict(from_attributes=True)