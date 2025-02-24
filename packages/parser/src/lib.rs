/// Command intermediate representation
pub mod cir;
/// Command syntax
pub mod syn;

/// Item searcher
pub mod search;

mod parse_output;
pub use parse_output::parse_script as parse;
pub use parse_output::ParseOutput;
pub use parse_output::{parse_semantic, parse_tokens};

mod semantic_token;
pub use semantic_token::SemanticToken;

mod error;
pub use error::{Error, ErrorReport};
mod util;

/// Generated data
mod generated {
    #[cfg(not(feature = "mock-data"))]
    #[rustfmt::skip]
    mod armor_upgrade;
    #[cfg(feature = "mock-data")]
    mod armor_upgrade {
        pub static ARMOR_UPGRADE: &[[&str; 5]] =
            &[["001_Mock", "002_Mock", "003_Mock", "004_Mock", "005_Mock"]];
    }
    pub use armor_upgrade::ARMOR_UPGRADE;

    #[cfg(not(feature = "mock-data"))]
    #[rustfmt::skip]
    mod item_name;
    #[cfg(feature = "mock-data")]
    mod item_name {
        use crate::search::SearchName;
        pub static ITEM_NAMES: &[SearchName] = &[SearchName::new("mock", "Item_Mock", true, 4)];
    }
    pub use item_name::ITEM_NAMES;
}
